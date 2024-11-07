import { useEffect, useRef, useState } from "react"
import css from "./StationPart.module.css"
import { BsPencil, BsPlusLg } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import { BsPower } from "react-icons/bs";
import clsx from "clsx";
import { RiSave3Fill } from "react-icons/ri";







export default function StationPart() {
    const [posts, setPosts] = useState([
        { name: "ПОСТ 1",  isDisabled: false, id: 1 },
        { name: "ПОСТ 2",  isDisabled: false, id: 2 },
        { name: "ПОСТ 3",  isDisabled: false, id: 3 },
        { name: "ПОСТ 4",  isDisabled: false, id: 4 }]);
  const [newPost, setNewPost] = useState("");
  const [isEditing, setIsEditing] = useState(null)
  const inputFocusRef = useRef();

    const toDisable = (index) => {
        setPosts(posts.map((post, i) => i === index ? { ...post, isDisabled: !post.isDisabled } : post));
    }


    const handleChangePN = (newName, index) => {
        setPosts(posts.map((post, i) => i === index ? { ...post, name: newName } : post));
    }

  const handleEditing = (postId) => {
    setIsEditing(isEditing === postId ? null : postId);
    }

  useEffect(() => {
  if(isEditing){
      inputFocusRef.current.focus()
    }
}, [isEditing])
  
    const handleAddPost = () => {
        if (newPost.trim()) {
            setPosts([...posts, { name: newPost, isDisabled: false, id: Date.now() }]);
            setNewPost("");
        }
    }

    const deletePost = (index)=>{
        setPosts((prevPosts) => prevPosts.filter((_,i) => i !== index))
    }

    return (
      <div>
        <p className={css.title}>Назва поста</p>
        <ul className={css.postList}>
          {posts.map((post, index) => (
            <li key={index} className={css.postListItem}>
              {isEditing === post.id ? (
                <input
                  value={post.name}
                  onChange={(e) => handleChangePN(e.target.value, index)}
                  className={css.inputForPostName}
                  ref={inputFocusRef}
                />
              ) : (
                <p className={css.postName}>{post.name}</p>
              )}
              <div className={css.iconsBox}>
                
                {isEditing === post.id ? (
                  <RiSave3Fill
                    className={css.icons}
                    onClick={() => handleEditing(post.id)}
                  />
                ) : (
                  <BsPencil
                    className={css.icons}
                    onClick={() => handleEditing(post.id)}
                  />
                )}
                <BsTrash
                  className={css.icons}
                  onClick={() => deletePost(index)}
                />
                <BsPower
                  className={clsx(css.power, {
                    [css.powerDisabled]: post.isDisabled,
                  })}
                  onClick={() => toDisable(index)}
                />
              </div>
            </li>
          ))}
        </ul>
        <div className={css.addBox}>
          <input
            placeholder="Додати новий пост..."
            className={css.addInput}
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
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