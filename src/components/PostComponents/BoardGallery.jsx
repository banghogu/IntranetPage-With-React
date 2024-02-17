import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs, orderBy, query } from 'firebase/firestore';
import { auth, db, storage } from "../../firebase";
import { useNavigate } from 'react-router-dom';

import { deleteObject, ref } from "firebase/storage";
import React from "react";

import profileDefault from "../../assets/profile_default.png";
import Block from "../Common/Block";

export default function BoardGallery({ pagination }) {
    const user = auth.currentUser;
    const [dialogStates, setDialogStates] = useState({});
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    // PostList 페이지에서
    const handleViewPost = (postId) => {
        navigate(`/posts/${postId}`, { state: { postId } });
    };

    //페이지네이션
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
    const itemsPerPage = 4; // 페이지당 항목 수

    // 삭제 등의 작업 후에 목록을 다시 가져오는 함수
    const fetchPosts = async () => {
        const postsQuery = query(
            collection(db, "posts"),
            orderBy("createAt", "desc")
        );

        try {
            const snapshot = await getDocs(postsQuery);
            const newPosts = snapshot.docs.map(doc => {
                const { title, textContent, createAt, userId, username, photo } = doc.data();
                return {
                    title, textContent, createAt, userId, username, photo, id: doc.id
                };
            });
            setPosts(newPosts);
        } catch (error) {
            console.error("게시물 목록 가져오기 중 에러:", error);
        }
    };

    // 삭제기능
    const onDelete = async (postId, userId, photo) => {
        const ok = confirm("삭제하시겠습니까?")
        if (!ok || user?.uid !== userId) return;
        try {
            // postId를 사용하여 deleteDoc 호출
            await deleteDoc(doc(db, "posts", postId));
            if (photo) {
                const photoRef = ref(storage, `posts/${user.uid}/${postId}`)
                await deleteObject(photoRef);
            }
            // 삭제 후 게시물 목록 갱신
            fetchPosts();
        } catch (error) {
            console.error("게시물 삭제 중 에러:", error);
        }
    }

    // 세부페이지 경로
    const ViewPost = (postId) => {
        navigate(`/posts/${postId}`);
    };

    useEffect(() => {
        fetchPosts();
    }, [currentPage]); // 페이지 변경 시에만 fetchPosts 호출

    return (
        <div className={"gallery"}>
            <ul className={"board"}>
                {/* slice() 메서드를 사용하여 현재 페이지에 해당하는 항목만 추출. 
            이를 위해 currentPage와 itemsPerPage를 사용하여 시작 인덱스와 끝 인덱스를 계산 */}
                {posts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(post => (
                    <li key={post.id}>
                        <Block>
                            <a href="" onClick={() => ViewPost(post.id)} >
                                <img src={post.photo || profileDefault} alt="" />
                                <div className="gallery__info">
                                    <div className="board__title">{post.title}</div>
                                    <div className="board__content">
                                        {post.textContent}
                                    </div>
                                    <div className="board__writer">{post.username}</div>
                                </div>
                            </a>
                        </Block>
                    </li>
                ))}
            </ul>

            {/* 페이지네이션 */}
            {pagination && (
                <div className="align right">
                    <div className="pagination">
                        <button disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prevPage => prevPage - 1)}>이전</button>
                        <button disabled={posts.length <= itemsPerPage * currentPage}
                            onClick={() => setCurrentPage(prevPage => prevPage + 1)}>다음</button>
                    </div>
                </div>
            )}
        </div>
    );
};

