import { useEffect, useRef, useState } from "react";
import css from "./StationPart.module.css";
import { BsPlusLg } from "react-icons/bs";
import SwitchableBtns from "../../sharedComponents/SwitchableBtns/SwitchableBtns";
import { useDispatch } from "react-redux";
// import { getPosts } from "../../../redux/settings/operations";
import { useSelector } from "react-redux";
import { selectPosts } from "../../../redux/settings/selectors";
import { createPost } from "../../../redux/settings/operations";

export default function StationPart() {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     await dispatch(getPosts());
  //   };
  //   fetchData();
  // });
  const posts = useSelector(selectPosts);
  console.log("posts", posts);

  // const [posts, setPosts] = useState(
  //   stations
  // [
  //   { name: "ПОСТ 1", isDisabled: false, id: 1 },
  //   { name: "ПОСТ 2", isDisabled: false, id: 2 },
  //   { name: "ПОСТ 3", isDisabled: false, id: 3 },
  //   { name: "ПОСТ 4", isDisabled: false, id: 4 },
  // ]
  // );
  const [newPostName, setNewPostName] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [editedValue, setEditedValue] = useState({});
  const inputFocusRef = useRef();
  const scrollToTheLastItemRef = useRef();

  const toDisable = (index) => {
    // setPosts(
    //   posts.map((post, i) =>
    //     i === index ? { ...post, isDisabled: !post.isDisabled } : post
    //   )
    // );
  };

  const handleChangePN = (newName, index) => {
    // setPosts(
    //   posts.map((post, i) => (i === index ? { ...post, name: newName } : post))
    // );
  };

  const handleEditing = (postId) => {
    const postToEdit = posts.find((post) => post.id === postId);
    setEditedValue(postToEdit);
    setIsEditing(isEditing === postId ? null : postId);
  };

  useEffect(() => {
    if (isEditing) {
      inputFocusRef.current.focus();
    }
  }, [isEditing]);

  const handleAddPost = () => {
    if (newPostName.trim()) {
      // setPosts([
      //   ...posts,
      //   { name: newPost, isDisabled: false, id: Date.now() },
      // ]);
      const newPost = { name_post: newPostName };
      dispatch(createPost(newPost));
      setNewPostName("");
    }
  };

  useEffect(() => {
    if (posts.length > 0) {
      scrollToTheLastItemRef.current?.scrollTo({
        top: scrollToTheLastItemRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [posts]);

  const deletePost = (index) => {
    // setPosts((prevPosts) => prevPosts.filter((_, i) => i !== index));
  };

  const handleRepeal = () => {
    if (editedValue) {
      setPosts(
        posts.map((post) =>
          post.id === editedValue.id
            ? { ...post, name: editedValue.name }
            : post
        )
      );
      setIsEditing(null);
    }
  };

  return (
    <div className={css.stationPart}>
      <p className={css.title}>Назва поста</p>
      <div className={css.divForScroll} ref={scrollToTheLastItemRef}>
        <ul className={css.postList}>
          {posts.map((post, index) => (
            <li key={post.id || `temp-${index}`} className={css.postListItem}>
              {isEditing === post.id ? (
                <input
                  value={post.name}
                  onChange={(e) => handleChangePN(e.target.value, index)}
                  className={css.inputForPostName}
                  ref={inputFocusRef}
                />
              ) : (
                <p className={css.postName}>{post.name_post}</p>
              )}

              <SwitchableBtns
                onEdit={() => handleEditing(post.id)}
                onToggleDisable={() => toDisable(index)}
                onDelete={() => deletePost(index)}
                isDisabled={post.isDisabled}
                showIconSave={true}
                id={post.id}
                isEditing={isEditing}
                onRepeal={() => handleRepeal(post.id)}
                text={post.name_post}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className={css.addBox}>
        <input
          placeholder="Додати новий пост..."
          className={css.addInput}
          value={newPostName}
          onChange={(e) => setNewPostName(e.target.value)}
        />
        <button type="button" className={css.addBtn} onClick={handleAddPost}>
          <span className={css.plus}>
            <BsPlusLg className={css.iconPlus} />
          </span>
          Додати
        </button>
      </div>
    </div>
  );
}
