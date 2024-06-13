const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {

			client: null,
			artist: null,
			artists: null,
			works: null
		},
		actions: {

			login: async (user) => {

				try {
					const resp = await fetch(process.env.BACKEND_URL + `/api/login_${user.userType}`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(user)
					});

					if (resp.ok) {
						const data = await resp.json();

						setStore({ token: data.token })
						localStorage.setItem('token', data.token);


					} else {
						console.log("Error en la solicitud:", resp.statusText);
					}
				} catch (error) {
					console.log("Error en la solicitud:", error);
				}
			},

			registerUserClient: async (userClient) => {
				try {
					const store = getStore();
					const resp = await fetch(process.env.BACKEND_URL + "/api/user_client", {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						}, body: JSON.stringify(userClient)
					})
					const client = await resp.json()
					setStore({ ...store, client })
					return client;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},

			registerUserArtist: async (userArtist) => {
				try {
					const store = getStore();
					const resp = await fetch(process.env.BACKEND_URL + "/api/user_artist", {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						}, body: JSON.stringify(userArtist)
					})
					const artist = await resp.json()
					setStore({ ...store, artist })
					return artist;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},

			getAllArtists: async () => {
				const resp = await fetch(process.env.BACKEND_URL + "/api/user_artists")
				const data = await resp.json()
				const store = getStore()
				console.log(data)
				setStore({...store, artists:data })
			},
           getWorks:async(id) =>{
			 const resp = await fetch(process.env.BACKEND_URL + `/api/works/user_artist/${id}`)
			 const data = await resp.json()
			 const store = getStore()
			 setStore({...store, works:data  })
		   }
		}  
	};
};

export default getState;
