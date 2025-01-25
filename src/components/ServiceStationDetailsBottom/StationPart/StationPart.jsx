import { useEffect, useRef, useState } from "react";
import css from "./StationPart.module.css";
import { BsPlusLg } from "react-icons/bs";
import SwitchableBtns from "../../sharedComponents/SwitchableBtns/SwitchableBtns";
import { useDispatch } from "react-redux";
import { getPosts, updatePostData } from "../../../redux/settings/operations";
import { useSelector } from "react-redux";
import { selectPosts } from "../../../redux/settings/selectors";
import { createPost, deletePost } from "../../../redux/settings/operations";
import toast from "react-hot-toast";

export default function StationPart() {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     await dispatch(getPosts());
  //   };
  //   fetchData();
  // });
  const posts = useSelector(selectPosts);

  useEffect(() => {
    console.log("posts", posts);
  }, [posts]);

  const [newPostName, setNewPostName] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [editedValue, setEditedValue] = useState({});
  const inputFocusRef = useRef();
  const scrollToTheLastItemRef = useRef();

  const toDisable = (post_id, status) => {
    const newStatus = status === 1 ? 0 : 1;
    const updatedPost = { post_id, status: newStatus };
    dispatch(updatePostData(updatedPost))
      .unwrap()
      .then(() => {
        toast.success("Статус успішно оновлено :)", {
          position: "top-center",
          duration: 3000,
          style: {
            background: "var(--bg-input)",
            color: "var(--white)FFF",
          },
        });
        // dispatch(getPosts());
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
        toast.error("Щось пішло не так :(", {
          position: "top-center",
          duration: 3000,
          style: {
            background: "var(--bg-input)",
            color: "var(--white)FFF",
          },
        });
      });
  };

  const handleChangePN = (post_id, newName) => {
    setEditedValue((prev) => ({
      ...prev,
      [post_id]: newName,
    }));
  };

  const handleEditing = (postId) => {
    const postToEdit = posts.find((post) => post.id === postId);
    setEditedValue((prev) => ({
      ...prev,
      [postId]: postToEdit.name_post,
    }));
    setIsEditing(isEditing === postId ? null : postId);
  };

  useEffect(() => {
    if (isEditing) {
      inputFocusRef.current.focus();
    }
  }, [isEditing]);

  const handleAddPost = () => {
    if (newPostName.trim()) {
      const newPost = { name_post: newPostName, status: 1 };
      dispatch(createPost(newPost))
        .unwrap()
        .then(() => {
          dispatch(getPosts());
          setNewPostName("");
        })
        .catch((error) => {
          console.error("Error creating post:", error);
        });
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

  const deletePostById = (id) => {
    dispatch(deletePost(id))
      .unwrap()
      .then(() => {
        toast.success("Успішно видалено :)", {
          position: "top-center",
          duration: 3000,
          style: {
            background: "var(--bg-input)",
            color: "var(--white)FFF",
          },
        });
        // dispatch(getPosts());
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
        toast.error("Щось пішло не так :(", {
          position: "top-center",
          duration: 3000,
          style: {
            background: "var(--bg-input)",
            color: "var(--white)FFF",
          },
        });
      });
    // });
  };

  const handleRepeal = (postId) => {
    setEditedValue((prev) => {
      const newState = { ...prev };
      delete newState[postId];
      return newState;
    });
    setIsEditing(null);
  };

  const handleSaveUpdatedData = (post_id) => {
    const newName = editedValue[post_id];

    if (newName && newName.trim()) {
      const updatedPostName = { post_id, name_post: newName };
      dispatch(updatePostData(updatedPostName))
        .unwrap()
        .then(() => {
          toast.success("Назву поста успішно оновлено :)", {
            position: "top-center",
            duration: 3000,
            style: {
              background: "var(--bg-input)",
              color: "var(--white)FFF",
            },
          });
          setIsEditing(null);
          setEditedValue((prev) => {
            const newState = { ...prev };
            delete newState[post_id];
            return newState;
          });
        })
        .catch((error) => {
          console.error("Error updating user data:", error);
          toast.error("Щось пішло не так :(", {
            position: "top-center",
            duration: 3000,
            style: {
              background: "var(--bg-input)",
              color: "var(--white)FFF",
            },
          });
        });
    }
    // .then(() => {
    //   dispatch(getPosts())
    //     .then(() => {
    //       toast.success("Назву поста успішно оновлено :)", {
    //         position: "top-center",
    //         duration: 3000,
    //         style: {
    //           background: "var(--bg-input)",
    //           color: "var(--white)FFF",
    //         },
    //       });
    //       setIsEditing(null);
    //       setEditedValue((prev) => {
    //         const newState = { ...prev };
    //         delete newState[post_id];
    //         return newState;
    //       });
    //     })
    //     .catch((error) => {
    //       console.error("Error updating user data:", error);
    //       toast.error("Щось пішло не так :(", {
    //         position: "top-center",
    //         duration: 3000,
    //         style: {
    //           background: "var(--bg-input)",
    //           color: "var(--white)FFF",
    //         },
    //       });
    //     });
    // });
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
                  value={editedValue[post.id] || ""}
                  onChange={(e) => handleChangePN(post.id, e.target.value)}
                  className={css.inputForPostName}
                  ref={inputFocusRef}
                />
              ) : (
                <p className={css.postName}>{post.name_post}</p>
              )}

              <SwitchableBtns
                onEdit={() => handleEditing(post.id)}
                onSave={() => handleSaveUpdatedData(post.id)}
                onToggleDisable={() => toDisable(post.id, post.status)}
                onDelete={() => deletePostById(post.id)}
                isDisabled={post.status}
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
