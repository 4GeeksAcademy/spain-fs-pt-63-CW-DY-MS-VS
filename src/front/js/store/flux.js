const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			artists: null,
			client: null,
			artist: null,
			works: null
		},
		actions: {
			deleteToken: () => {
				const store = getStore()
				const token = localStorage.getItem("token")
				if (token) {
					localStorage.removeItem("token");
					setStore({ ...store, token: null })
				}
			},
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
				const store = getStore()
				const resp = await fetch(process.env.BACKEND_URL + "/api/user_artists")
				const data = await resp.json()

				setStore({ ...store, artists: data })
				return data
			},
			getArtistsWithWorks: async () => {
				const store = getStore()

				try {
					await getActions().getAllArtists();  // Fetch all artists and set them in the store
					const artistsData = getStore().artists;

					if (artistsData) {
						const artistMap = artistsData.reduce((acc, artist) => {
							acc[artist.id] = {
								name: `${artist.first_name} ${artist.last_name}`,
								works: []
							};
							return acc;
						}, {});

						//console.log(artistMap)
						const artistIds = artistsData.map(el => el.id);
						//console.log(artistIds);

						const worksPromises = artistIds.map(id => getActions().getWorks(id));
						const worksData = await Promise.all(worksPromises);

						// Flatten the array of works arrays
						const flattenedWorks = worksData.flat();

						flattenedWorks.forEach(work => {
							if (artistMap[work.user_artist]) {
								artistMap[work.user_artist].works.push(work);
							}
						});

						// Add the artist name to each work
						const artistsWithWorks = Object.keys(artistMap).map(id => ({
							id,
							name: artistMap[id].name,
							works: artistMap[id].works
						}));

						setStore({ ...store, gallery: artistsWithWorks })
						console.log(artistsWithWorks);
						return artistsWithWorks
					}
				} catch (error) {
					console.error('Error fetching data:', error);
				}
			},

			getWorks: async (id) => {
				const store = getStore()
				const resp = await fetch(process.env.BACKEND_URL + `/api/works/user_artist/${id}`)
				const data = await resp.json()

				setStore({ ...store, works: data })
				return data
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
					console.log(newWork)
					return newWork
				} catch (error) {
					console.log("Error in FLUX", error)
				}
			},
			setImage: async (imgId) => {
				const store = getStore()
				setStore({ ...store, image: imgId })
			}
		},
	}
};


export default getState;