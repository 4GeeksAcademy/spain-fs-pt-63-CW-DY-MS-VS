import React from "react";
import { Link } from "react-router-dom";


export const Navbar = () => {
	return (
		<nav class="navbar navbar-expand-lg bg-body-tertiary text-light ">
			<div class="container-fluid text-white">
				<a className="navbar-brand text-white" href="#">
					<img src= "https://files.slack.com/files-pri/T0BFXMWMV-F0757DXV069/pixelarte__1_.png" />
				</a>

				<div class="collapse navbar-collapse text-white" id="navbarNavDropdown">
					<ul class="navbar-nav">
						<li class="nav-item">
							<a class="nav-link active" aria-current="page" href="#">Home</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">Galeria</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#">Perfil</a>
						</li>
						<li class="nav-item dropdown">
							<a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
								Menú
							</a>
							<ul class="dropdown-menu">
								<li><a class="dropdown-item" href="#">Home</a></li>
								<li><a class="dropdown-item" href="#">Galeria</a></li>
								<li><a class="dropdown-item" href="#">Perfil</a></li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};
