import { addDoc, collection, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { getDoc, doc } from "firebase/firestore";
import { db, auth, storage } from "../firebase";
import { useNavigate } from 'react-router-dom';

import React, { useState } from "react";
import Block from "../components/Common/Block";
import Heading from "../components/Common/Heading";
import Text from "../components/Common/Text";
import Input from "../components/Form/Input";
import Textarea from "../components/Form/Textarea";
import AddFile from "../components/Form/AddFile";

import "./AddPost.scss"

const AddPost = ({ username }) => {

    const navigate = useNavigate();
    const goTolist = () => {
        navigate('/notice')
    }

    const [isLoading, setLoading] = useState(false)
    const [title, setTitle] = useState("")
    const [textContent, setTextContent] = useState("")
    const [file, setFile] = useState(null)

    const onChangeTitle = (e) => {
        setTitle(e.target.value)
    }

    const onChangeTextContent = (e) => {
        setTextContent(e.target.value)
    }

    const onFileChange = (e) => {
        const { files } = e.target;
        if (files && files.length === 1) {
            setFile(files[0])
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const user = auth.currentUser;

        if (isLoading || title === "" || title.length > 50) return;

        try {
            const userConfirmed = window.confirm("글을 등록하시겠습니까?")
            if (!userConfirmed) {
                return
            }
            setLoading(true);

            const docRef = await addDoc(collection(db, "posts"), {
                title,
                textContent,
                createAt: new Date().toLocaleString(),
                username: user.displayName,
                userId: user.uid,

            });
            navigate('/notice')

            // docRef에 있는 ID를 통해 해당 글의 데이터를 가져옴
            const newPostId = docRef.id;
            const newPostData = (await getDoc(doc(db, "posts", newPostId))).data();

            console.log("글이 성공적으로 등록되었습니다.", newPostData);

            if (file) {
                const locationRef = ref(storage, `posts/${user.uid}/${docRef.id}`)
                const result = await uploadBytes(locationRef, file)
                const url = await getDownloadURL(result.ref)
                await updateDoc(docRef, {
                    photo: url
                })
            }

            //초기화
            setTitle("")
            setFile(null)
            setTextContent("")

        } catch (error) {
            console.error("글 등록 중 오류 발생:", error);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="notice__wrapper">
            <Block>
                <Heading tag={"h2"} size={"large"} text={"Post Edit"} />
                <Text type={"type1"} text={"게시판에 등록할 글을 작성해주세요."} />
                <hr />

                <form onSubmit={onSubmit}>
                    <div className="notice__wrapper__contents">

                        <div className="file">
                            <Text className="align center" type={"type2"} text={"첨부파일 : "} />
                            <input onChange={onFileChange} width={"95%"} type="file" id="file" accept="image/*" />
                        </div>

                        <div>
                            <Input width={"100%"} placeholder="제목을 작성해주세요." onChange={onChangeTitle} required />
                        </div>

                        <div>
                            <Textarea onChange={onChangeTextContent} placeholder="글을 작성해주세요." width={"100%"} height={"22rem"} />

                        </div>

                        <AddFile id={"file"} text={file ? "파일이 추가되었습니다" : "첨부파일"} file={file} />

                        <div className="align center">
                            <button type="button" className="btn regular danger" onClick={goTolist} >뒤로가기</button>
                            <Input width={"100%"} type="submit" className="btn regular primary"
                                value={isLoading ? "로딩중" : "글쓰기"} onClick={onSubmit}
                            />

                        </div>

                    </div>

                </form>
            </Block>
        </div>
    );
};

export default AddPost;
