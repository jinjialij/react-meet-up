import Card from "../ui/Card";
import classes from "./NewMeetupForm.module.css";
import { useRef, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { storage } from "../../firebase/firebase";

function NewMeetupForm(props) {
  const titleInputRef = useRef();
  // const imageInputRef = useRef();
  const addressInputRef = useRef();
  const descInputRef = useRef();

  const [progress, setProgess] = useState(0);
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [isLoadingImg, setIsLoadingImg] = useState(false);

  const setDisabledHandler = () => {
    const value = imageUrl && titleInputRef.current.value && addressInputRef.current.value && descInputRef.current.value;
    // console.log(!value)
    setDisabled(!value);
  }

  const uploadHandler = (event) => {
    // console.log(event.target.files[0]);
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const uploadToStorageHandler = () => {
    if (!image) return;
    setIsLoadingImg(true);
    const storageRef = ref(storage, `/images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog =
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgess(prog);
      },
      (error) => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImageUrl(url);
          // console.log(url);
          setIsLoadingImg(false);
          setDisabledHandler();
        });
      }
    );
  };
  function submitHandler(event) {
    event.preventDefault(); //from js

    const enteredTitleInput = titleInputRef.current.value;
    // const enteredImageInput = imageInputRef.current.value;
    const enteredAddressInput = addressInputRef.current.value;
    const enteredDescInput = descInputRef.current.value;

    //To-do: update the validation
    //validate
    if (
      !imageUrl ||
      !enteredTitleInput ||
      !enteredAddressInput ||
      !enteredDescInput
    ) {

      return;
    }

    const meetupData = {
      title: enteredTitleInput,
      image: imageUrl,
      address: enteredAddressInput,
      desc: enteredDescInput,
      fav: false,
    };
    // console.log(meetupData);
    props.onAddMeetup(meetupData);
  }
  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Meetup Title</label>
          <input type="text" required id="title" ref={titleInputRef} onChange={setDisabledHandler} />
        </div>

        <div className={classes.control}>
          <label htmlFor="image">Meetup Image</label>
          <input type="file" required id="image" onChange={uploadHandler} accept="image/*" />
          {image &&
            <div className={classes.uploadbtn}>
              <button disabled={isLoadingImg} onClick={uploadToStorageHandler}>Upload</button>
            </div>}

          <div className={classes.upload}>
            {image && <h3>Upload {progress}%</h3>}
            {isLoadingImg && (<p>...isLoading</p>)}
            {image && imageUrl && (
              <img
                src={imageUrl}
                alt="uploadImage"
                className={classes.imageview}
                onLoad={loadingHandler}
              />
            )}
          </div>
        </div>

        <div className={classes.control}>
          <label htmlFor="address">Meetup address</label>
          <input type="text" required id="address" ref={addressInputRef} onChange={setDisabledHandler} />
        </div>

        <div className={classes.control}>
          <label htmlFor="desc">Meetup description</label>
          <textarea rows="5" required id="desc" ref={descInputRef} onChange={setDisabledHandler}></textarea>
        </div>

        <div className={classes.actions}>
          <button disabled={disabled}>Add Meetup</button>
        </div>
      </form>
    </Card>
  )
}

export default NewMeetupForm;
