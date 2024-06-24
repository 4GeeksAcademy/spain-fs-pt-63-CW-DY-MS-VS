const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			artists: null,
			client: null,
			artist: null,
			artists: null,
			works: null,
			userClient: null,
			userArtist: null
		},
		actions: {
			getWorks: () => {


			},

			deleteToken: () => {
				const store = getStore()
				const token = localStorage.getItem("token")
				if (token) {
					localStorage.removeItem("token");
					localStorage.removeItem("userData")
					setStore({ ...store, token: null, userClient: null, userArtist: null })
				}
			},
			login: async (user) => {
				const store = getStore()
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
						setStore({ ...store, token: data.token })
						if (user.userType === 'artist') {
							await getActions().getUserArtist();
						} else if (user.userType === "client") {
							await getActions().getUserClient();
						}
					} else {
						console.log("Error en la solicitud:", resp.statusText);
					}
				} catch (error) {
					console.log("Error en la solicitud:", error);
				}
			},

			getUserClient: async () => {
				const resp = await fetch(process.env.BACKEND_URL + '/api/user_client', {
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + localStorage.getItem('token')
					}
				})
				const data = await resp.json()
				console.log(data)
				setStore({ userClient: data })
				localStorage.setItem("userData", JSON.stringify(data))
				return data
			},

			updateUserClient: async () => {
				const resp = await fetch(process.env.BACKEND_URL + `/api/user_client`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + localStorage.getItem('token')
					},
					body: JSON.stringify()
				})
				const data = await resp.json({
					first_name: first_name, last_name: last_name, password: password
				})
				console.log(data)
			},

			getUserArtist: async () => {
				console.log('funciona')
				const resp = await fetch(process.env.BACKEND_URL + '/api/user_artist', {
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + localStorage.getItem('token')
					}
				})
				const data = await resp.json()

				localStorage.setItem("userData", JSON.stringify(data))
				await setStore({ userArtist: data })
				return data
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
				const store = getStore();
				const resp = await fetch(process.env.BACKEND_URL + "/api/user_artists");
				const data = await resp.json();

				setStore({ ...store, artists: data });
				return data
			},
			getArtistsWithWorks: async () => {
				const store = getStore()

				try {
					await getActions().getAllArtists();
					const artistsData = getStore().artists;

					if (artistsData) {
						const artistMap = artistsData.reduce((acc, artist) => {
							acc[artist.id] = {
								name: `${artist.first_name} ${artist.last_name}`,
								works: []
							};
							return acc;
						}, {});

						const artistIds = artistsData.map(el => el.id);

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

			getAllWorks: async () => {
				const store = getStore()
				const resp = await fetch(process.env.BACKEND_URL + `/api/works`)
				const data = await resp.json()

				setStore({ ...store, allWorks: data })
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
			},
			addToFavorites: async (work, userData) => {
				const store = getStore()
				const user = JSON.parse(userData)
				try {
					if (user.userType === "client") {
						const body = JSON.stringify({
							client_id: user.id,
							work_id: work.id,
						})

						const resp = await fetch(process.env.BACKEND_URL + `/api/favorites_${user.userType}`, {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json'
							}, body: body
						})
						const workAdded = await resp.json()
						setStore({ ...store, favorites: [...store.favorites, workAdded] })
						console.log("Successfully added to favorites:", workAdded)

					} else if (user.userType === "artist") {
						const body = JSON.stringify({
							artist_id: user.id,
							work_id: work.id
						})

						const resp = await fetch(process.env.BACKEND_URL + `/api/favorites_${user.userType}`, {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json'
							}, body: body
						})
						const workAdded = await resp.json()
						setStore({ ...store, favorites: [...store.favorites, workAdded] })
						console.log("Successfully added to favorites:", workAdded)
					}
				} catch (error) {
					console.log(error, "Failed to add to favorites.")
				}
			},
			getFavorites: async (user) => {
				const store = getStore()
				try {
					const query = new URLSearchParams({
						user_id: user.id,
						user_type: user.userType
					}).toString();

					const resp = await fetch(`${process.env.BACKEND_URL}/api/favorites?${query}`);
					const favorites = await resp.json();

					setStore({ ...store, favorites: favorites })
					console.log(favorites);
					return favorites;
				} catch (error) {
					console.log(error, "Error fetching favorites");
				}
			},
			deleteFromFavorites: async (workId) => {
				const store = getStore()
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/favorites/${workId}`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json'
						}
					});

					if (resp.ok) {
						const updatedFavorites = store.favorites.filter(fav => fav.id !== workId);
						setStore({ ...store, favorites: updatedFavorites });

					} else {
						throw new Error('Failed to delete favorite');
					}
				} catch (error) {
					console.error('Error deleting favorite:', error.message);
				}
			}

		}
	}
};


export default getState;