import { addDoc, collection, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { getDoc, doc } from "firebase/firestore";
import { db, auth, storage } from "../../firebase";
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';
import { getAuth } from 'firebase/auth';


import Block from "../Common/Block";
import Heading from "../Common/Heading";
import AddFile from "../Form/AddFile";
import Input from "../PostComponents/Input";
import Textarea from "../Form/Textarea";
import Text from "../Common/Text";
import { useLocation } from 'react-router-dom';

const PostUpdate = () => {

    const { state } = useLocation();
    console.log('state:', state); // state 값이 어떻게 출력되는지 확인

    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    // postId를 state에서 추출
    const postId = state ? state.postId : null;

    // 나머지 변수들을 가져와서 적절한 데이터로 초기화
    const { img, username, textContent, userId } = state ? state : {};

    const [item, setItem] = useState({
        postId,
        img,
        username,
        textContent,
        userId
    })

    const [title, setTitle] = useState("");

    const onChange = useCallback((event, field) => {
        if (event && event.target && event.target.value !== undefined && field) {
            const { value } = event.target;
            setItem(prevItem => ({
                ...prevItem,
                [field]: value
            }));
        } else {
            console.error('Invalid event or field');
        }
    }, [setItem]);






    const titleChange = (event) => {
        const { value } = event.target || {}; // event.target이 유효하지 않은 경우 빈 객체를 기본값으로 설정
        setItem(prevItem => ({
            ...prevItem,
            title: prevItem.title // item.title을 사용하여 현재 상태의 title 값을 가져옴
        }));
    }


    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1)
    }

    const onFileChange = (e) => {
        const { files } = e.target;
        if (files && files.length === 1) {
            setFile(files[0])
        }
    }

    useEffect(() => {

        const fetchPosts = async () => {
            const auth = getAuth();
            const currentUser = auth.currentUser;
            setUser(currentUser);

            try {
                const postDoc = await getDoc(doc(db, "posts", postId));

                if (postDoc.exists()) {
                    const postData = postDoc.data();
                    setPosts([postData]);  // 데이터를 배열로 감싸서 설정
                } else {
                    console.log("No such document!");
                    setPosts([]);  // 문서가 없을 경우 빈 배열로 설정
                }
            } catch (fetchError) {
                console.error(`사용자 ${userId}에 대한 포스트 가져오기 오류:`, fetchError);
                setPosts([]);  // 오류 발생 시 빈 배열로 설정
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
        // userId, postId가 변경될때마다 함수실행(데이터갱신)
    }, []);

    //수정버튼

    const onEdit = async (event) => {
        event.preventDefault();
        if (!user?.uid || user.uid !== userId) return; // 유저 아이디가 없거나 현재 사용자와 다를 경우 처리

        if (file) {
            const locationRef = ref(storage, `posts/${user.uid}/${docRef.id}`)
            const result = await uploadBytes(locationRef, file)
            const url = await getDownloadURL(result.ref)
            await updateDoc(docRef, {
                photo: url
            })
        }

        try {
            // 파이어베이스에 해당 포스트의 데이터 업데이트
            await updateDoc(doc(db, "posts", postId), {
                title: item.title, // 제목 업데이트
                textContent: item.textContent // 내용 업데이트
            });

            // 페이지 이동
            navigate('/notice');
        } catch (error) {
            console.error("게시물 수정 중 에러:", error);
        }
    }




    const handleBtn = (postId) => {
        console.log("PostId in handleBtn:", postId);
        setDialogStates((prevState) => ({
            ...prevState,
            [postId]: !prevState[postId]
        }));
    }

    if (loading) {
        return
    }

    if (!posts) {
        return <p>Invalid post data. No post object.</p>;
    }

    return (
        <div>
            <Block>
                <>
                    {posts && posts.map(post => (
                        <div key={user.uid} className="detail__wrapper">
                            <li>
                                <div className="align">
                                    <Text type={"type1"} text={post.createAt} />
                                    <Text type={"type1"} text={post.username} />
                                </div>

                                <Heading tag={"h2"} size={"small"} text={post.title} />
                                {/* <Input width={"100%"} value={post.title} onChange={(e) => onChange(e, "title")} placeholder="제목을 수정해주세요." required /> */}
                                <hr />

                                <div className="file" style={{ display: "none" }}>
                                    <Text className="align center" type={"type2"} text={"첨부파일 : "} />
                                    <input onChange={onFileChange} width={"95%"} type="file" id="file" accept="image/*" />
                                </div>

                                {post.photo && <img src={post.photo} alt="포스트 이미지" />}
                                {/* <Text type={"type1"} text={post.textContent} /> */}
                                <Textarea value={post.textContent} onChange={(e) => onChange(e, "textContent")} placeholder="글을 수정해주세요." width={"100%"} height={"22rem"} />
                            </li>


                            <div className="align center ">
                                <button type="button" className="btn regular primary" onClick={goBack} >뒤로가기</button>
                                <button className="btn regular success" onClick={onEdit} >수정하기 </button>
                            </div>



                        </div>

                    ))}
                </>
            </Block>
        </div>

    );
}

export default PostUpdate