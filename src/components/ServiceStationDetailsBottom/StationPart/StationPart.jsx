import { useState } from "react"
import css from "./StationPart.module.css"
import { BsPencil, BsPlusLg } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import { BsPower } from "react-icons/bs";
import { BiSolidPlusSquare } from "react-icons/bi";
import clsx from "clsx";
import { RiSave3Fill } from "react-icons/ri";







export default function StationPart() {
    const [posts, setPosts] = useState([
        { name: "ПОСТ 1", isEditing: false, isDisabled: false },
        { name: "ПОСТ 2", isEditing: false, isDisabled: false },
        { name: "ПОСТ 3", isEditing: false, isDisabled: false },
        { name: "ПОСТ 4", isEditing: false, isDisabled: false }]);
    const [newPost, setNewPost] = useState("");

    const toDisable = (index) => {
        setPosts(posts.map((post, i) => i === index ? { ...post, isDisabled: !post.isDisabled } : post));
    }


    const handleChangePN = (newName, index) => {
        setPosts(posts.map((post, i) => i === index ? { ...post, name: newName } : post));
    }

    const handleEditing = (index) => {
        setPosts(posts.map((post, i) => i === index ? { ...post, isEditing: !post.isEditing } : post));
    }

    const handleAddPost = () => {
        if (newPost.trim()) {
            setPosts([...posts, { name: newPost, isEditing: false, isDisabled: false }]);
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
              {post.isEditing ? (
                <input
                  value={post.name}
                  onChange={(e) => handleChangePN(e.target.value, index)}
                  className={css.inputForPostName}
                />
              ) : (
                <p className={css.postName}>{post.name}</p>
              )}
              <div className={css.iconsBox}>
                {/* <button
                  type="button"
                  className={css.iconBtn}
                  onClick={() => handleEditing(index)}
                > */}
                {post.isEditing ? (
                  <RiSave3Fill
                    className={css.icons}
                    onClick={() => handleEditing(index)}
                  />
                ) : (
                  <BsPencil
                    className={css.icons}
                    onClick={() => handleEditing(index)}
                  />
                )}
                {/* </button> */}
                {/* <button
                  type="button"
                  className={css.iconBtn}
                  onClick={() => deletePost(index)}
                > */}
                <BsTrash
                  className={css.icons}
                  onClick={() => deletePost(index)}
                />
                {/* </button> */}
                {/* <button
                  type="button"
                  onClick={() => toDisable(index)}
                  className={css.iconBtn}
                > */}
                <BsPower
                  className={clsx(css.power, {
                    [css.powerDisabled]: post.isDisabled,
                  })}
                  onClick={() => toDisable(index)}
                />
                {/* </button> */}
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