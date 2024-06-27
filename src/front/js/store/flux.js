const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			client: null,
			artist: null,
			artists: null,
			works: null,
			userClient: null,
			userArtist: null,
			

		},
		actions: {
			addShoppingCar: async (itemToAdd) => {
				const store = getStore();
				try {
					const response = await fetch('https://supreme-space-zebra-jjj6xqj9pj54cx4q-3001.app.github.dev/api/shopping_cart', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(itemToAdd)
					});
			
					if (response.ok) {
						const updatedItem = await response.json();
						setStore({ shoppingCart: [...store.shoppingCart, updatedItem] });
					} else {
						console.error("Error updating item in cart", response.statusText);
					}
				} catch (error) {
					console.error("Error updating item in cart", error);
				}
			},
			
			getShoppingCart: async () => {
				try {
				  const userData = JSON.parse(localStorage.getItem("userData"));
				  if (!userData || !userData.id) {
					throw new Error("User data not found in localStorage or missing id.");
				  }
			  
				  const response = await fetch(`https://supreme-space-zebra-jjj6xqj9pj54cx4q-3001.app.github.dev/api/shopping_cart/${userData.id}`);
			  
				  if (!response.ok) {
					throw new Error(`Failed to fetch shopping cart data. Status: ${response.status}`);
				  }
			  
				  const data = await response.json();
			  
				  setStore(prevState => ({
					...prevState,
					shoppingCart: data || []
					
				  }));
				  return data
				} catch (error) {
				  console.error('Error fetching shopping cart:', error);
				}
			  },

			  
			  deleteItemFromCart: async (cartItemId) => {
				try {
				  const response = await fetch(`https://supreme-space-zebra-jjj6xqj9pj54cx4q-3001.app.github.dev/api/shopping_cart/${cartItemId}`, {
					method: 'DELETE'
				  });
				  if (response.ok) {
			
					const store = getStore();
					const updatedCart = store.cart.filter(item => item.id !== cartItemId);
					setStore({ cart: updatedCart });
				  } else {
					console.error("Error deleting item from cart");
				  }
				} catch (error) {
				  console.error("Error deleting item from cart:", error);
				}
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

						setStore({ ...store, token: data.token })
						localStorage.setItem('token', JSON.stringify({ token: data.token, type: user.userType }));

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
				const store = getStore()
				const token = JSON.parse(localStorage.getItem('token'))
				const resp = await fetch(process.env.BACKEND_URL + '/api/user_client', {
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + token.token
					}
				})
				const data = await resp.json()

				data.type = 'client';
				localStorage.setItem("userData", JSON.stringify(data))
				await setStore({ userData: data })

				console.log(store)
				return data
			},

			updateUserImage: async (imgId) => {
				const token = JSON.parse(localStorage.getItem("token")).token
				const userData = JSON.parse(localStorage.getItem("userData"))
				userData.image = imgId

				try {
					const resp = await fetch(process.env.BACKEND_URL + `/api/user_${userData.type}_image`, {
						method: "PUT",
						headers: {
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + token
						},
						body: JSON.stringify({ image: imgId })
					})
					const data = await resp.json()

					localStorage.setItem("userData", JSON.stringify(userData))
					return data
				} catch (error) {
					console.error('Error updating user image:', error);
					throw error;  // Rethrow the error to handle it elsewhere if needed
				}
			},

			updateUserClient: async (first_name, last_name) => {
				const resp = await fetch(process.env.BACKEND_URL + `/api/user_client`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + localStorage.getItem('token')
					},
					body: JSON.stringify({
						first_name: first_name, last_name: last_name
					})
				})
				const data = await resp.json()
				localStorage.setItem("userData", JSON.stringify(data))
				
				return data
			},

			updateUserClientPassword: async (password) => {
				const resp = await fetch(process.env.BACKEND_URL + `/api/user_client`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + localStorage.getItem('token')
					},
					body: JSON.stringify({
						password: password
					})
				})
				const data = await resp.json()
				
			},

			updateUserArtist: async (first_name, last_name, description) => {
				const resp = await fetch(process.env.BACKEND_URL + `/api/user_artist`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + localStorage.getItem('token')
					},
					body: JSON.stringify({
						first_name: first_name, last_name: last_name, description: description
					})
				});
				const data = await resp.json()
				localStorage.setItem("userData", JSON.stringify(data))
			
				return data
			},

			updateUserArtistPassword: async (password) => {
				const resp = await fetch(process.env.BACKEND_URL + `/api/user_artist`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + localStorage.getItem('token')
					},
					body: JSON.stringify({
						password: password
					})
				})
				const data = await resp.json()
				
			},

			getUserArtist: async () => {
				const token = JSON.parse(localStorage.getItem('token'))
				const resp = await fetch(process.env.BACKEND_URL + '/api/user_artist', {
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + token.token
					}
				})
				const data = await resp.json()
				data.type = 'artist';
				localStorage.setItem("userData", JSON.stringify(data))
				await setStore({ userData: data })
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
						
						return artistsWithWorks
					}
				} catch (error) {
					console.error('Error fetching data:', error);
				}
			},
			getWork: async (id) => {
				const resp = await fetch(process.env.BACKEND_URL + `/api/work/${id}`)
				const data = await resp.json()

				return data
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
				console.log(work, user)
				try {
					if (user.type === "client") {
						const body = JSON.stringify({
							client_id: user.id,
							work_id: work.id,
						})

						const resp = await fetch(process.env.BACKEND_URL + `/api/favorites_${user.type}`, {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json'
							}, body: body
						})
						const workAdded = await resp.json()
						setStore({ ...store, favorites: [...store.favorites, workAdded] })
						console.log("Successfully added to favorites:", workAdded)

					} else if (user.type === "artist") {
						const body = JSON.stringify({
							artist_id: user.id,
							work_id: work.id
						})

						const resp = await fetch(process.env.BACKEND_URL + `/api/favorites_${user.type}`, {
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
						user_type: user.type
					}).toString();

					const resp = await fetch(`${process.env.BACKEND_URL}/api/favorites?${query}`);
					const favorites = await resp.json();

					setStore({ ...store, favorites: favorites })
					return favorites;
				} catch (error) {
					console.log(error, "Error fetching favorites");
				}
			},
			getFavoritesWorks: async (user) => {
				try {
					const favorites = await getActions().getFavorites(user);

					const worksPromises = favorites.map(favorite => getActions().getWork(favorite.work_id));
					const worksArray = await Promise.all(worksPromises);

					const flattenedWorksArray = worksArray.flat();

					console.log(flattenedWorksArray)
					return flattenedWorksArray;
				} catch (error) {
					console.log(error, "Error fetching works for favorites");
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