const BASE_URL = `https://meetuphere.herokuapp.com/meetups`;
const TEST_URL = `http://localhost:5000/meetups`;

const fetchMeetups = async (url) => {
    let result;
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Failed to update, Status: ${res.status}`);
        }
        result = await res.json();
    } catch (error) {
        console.error(error);
    }

    return result;
}

const deleteMeetup = async (id) => {
    const url = `${BASE_URL}/${id}`;
    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: "",
        })
        if (!response.ok) {
            throw new Error(`Failed to delete Status: ${response.status}`);
        }

        const data = await response.json();
        return data.meetup;
    } catch (err) {
        console.error(err.message)
    }
};

const updateFavApi = (favoriteMeetUp, url) => {
    fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(favoriteMeetUp),
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Failed to update, Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            // console.log(data);
            return data.meetup;
        })
        .catch((err) => console.error(err));
};

function addMeetupApi(meetupData) {
    fetch(`${BASE_URL}/new-meetup`, {
        method: "POST",
        body: JSON.stringify(meetupData),
        headers: { "Content-type": "application/json" },
    }).then((res) => {
        if (!res.ok) {
            throw new Error(`Error adding new meetup, Status code: ${res.status}`)
        }
        return res.json()
    }).then(data => {
        // console.log(data);
        const doc = data.meetup._doc;
        const newMeetup = {
            id: data.meetup.id,
            ...doc
        };
        return newMeetup;
    })
        .catch(error => {
            console.error(error)
        })
    // console.log(newMeetup);
}

export { fetchMeetups, deleteMeetup, updateFavApi, addMeetupApi, TEST_URL, BASE_URL }