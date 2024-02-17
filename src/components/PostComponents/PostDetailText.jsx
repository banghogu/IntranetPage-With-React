import Text from "../Common/Text";
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from "../../firebase";
import Block from "../Common/Block";
import Heading from "../Common/Heading";
import { getAuth } from 'firebase/auth';
import { ref, deleteObject } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { storage } from "../../firebase";


import "./PostDetailText.scss"

const PostDetailText = () => {
    const { userId, postId } = useParams();
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1)
    }
    const postUpdate = (post) => {
        navigate('/posts/:postId/PostUpdate', {
            state: {
                post: post,
                postId: postId
            }
        })
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
    }, [userId, postId]);

    const onDelete = async (postId, userId, photo) => {
        const ok = window.confirm("삭제하시겠습니까?");
        if (!ok || user?.uid !== userId) return;

        console.log("Deleting post. PostId:", postId, "UserId:", userId);

        try {
            // postId를 사용하여 deleteDoc 호출
            await deleteDoc(doc(db, "posts", postId));  // 여기서 postId를 인자로 넣어줍니다.
            if (photo) {
                const photoRef = ref(storage, `posts/${user.uid}/${postId}`)
                await deleteObject(photoRef);
            }

        } catch (error) {
            console.error("게시물 삭제 중 에러:", error);
        }
        navigate('/notice')
    }


    const handleBtn = (postId) => {
        console.log("PostId in handleBtn:", postId);
        setDialogStates((prevState) => ({
            ...prevState,
            [postId]: !prevState[postId]
        }));
    }



    return (
        <div>
            <Block>
                <>
                    {posts && posts.map(post => (
                        <div key={user.uid} className="detail__wrapper">
                            <li>

                                <Heading tag={"h2"} size={"small"} text={post.title} />

                                <div className="align mt10">
                                    <Text type={"type1"} text={post.createAt} />
                                    <Text type={"type1"} text={post.username} />
                                </div>

                                <hr />
                                {post.photo && <img src={post.photo} alt="포스트 이미지" style={{ maxWidth: "500px" }} />}
                                <div className="textContent mt20">
                                    <Text type={"type1"} className="textContent" text={post.textContent} />
                                </div>



                            </li>


                            <div className="btn__align">
                                <button type="button" className="btn regular primary" onClick={goBack} >뒤로가기</button>
                                {user?.uid === post.userId ? (
                                    <div className="align right btn-box">
                                        <button onClick={() => onDelete(postId, post.userId, post.photo)}
                                            width={"100%"} className="btn regular danger"> 삭제하기 </button>
                                        <button className="btn regular success" onClick={() => { postUpdate(post) }}
                                            id={post.id}
                                            userid={post.userId}
                                            img={post.photo}
                                            title={post.title}
                                            username={post.username}
                                            textcontent={post.textContent}

                                        >수정하기 </button>
                                    </div>
                                ) : null}
                            </div>



                        </div>

                    ))}
                </>
            </Block>
        </div>

    );
};

export default PostDetailText;
