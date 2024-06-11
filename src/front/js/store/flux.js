const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			client: null,
			artist: null
		},
		actions: {
			registerUserClient: async (userClient) => {
				try {
					// fetching data from the backend
					const store = getStore();
					const resp = await fetch(process.env.BACKEND_URL + "/api/user_client", {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						}, body: JSON.stringify(userClient)
					})
					const client = await resp.json()
					setStore({ ...store, client })
					// don't forget to return something, that is how the async resolves
					return client;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			registerUserArtist: async (userArtist) => {
				try {
					// fetching data from the backend
					const store = getStore();
					const resp = await fetch(process.env.BACKEND_URL + "/api/user_artist", {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						}, body: JSON.stringify(userArtist)
					})
					const artist = await resp.json()
					setStore({ ...store, artist })
					// don't forget to return something, that is how the async resolves
					return artist;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			uploadWorkImage: async (imgId) => {
				try {
					const store = getStore();
					const image = imgId
					setStore({ ...store, image: image })
					return image;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			uploadWork: async (work) => {
				try {
					const store = getStore()
					const resp = await fetch(process.env.BACKEND_URL + "/api/work", {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						}, body: JSON.stringify(work)
					})
					const newWork = await resp.json()
					return newWork
				} catch (error) {
					console.log("Error", error)
				}
			}
		}
	};
};

export default getState;
