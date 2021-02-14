const imagesArea = document.querySelector(".images");
const gallery = document.querySelector(".gallery");
const galleryHeader = document.querySelector(".gallery-header");
const searchBtn = document.getElementById("search-btn");
const sliderBtn = document.getElementById("create-slider");
const sliderContainer = document.getElementById("sliders");
// selected image
let sliders = [];


// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key
const KEY = "15674931-a9d714b6e9d654524df198e00&q";

// show images
const showImages = (images) => {
	// check images Array & if array is empty than trow message:
	gallery.innerHTML = "";
	if (images == "") {
		galleryHeader.style.display = "none";
		document.getElementById("message").style.display = "block";
		// End spinner:
		spinner();
	} else {
		document.getElementById("message").style.display = "none";

		imagesArea.style.display = "block";

		// show gallery title
		galleryHeader.style.display = "flex";
		images.forEach((image) => {
			let div = document.createElement("div");
			div.className = "col-lg-3 col-md-4 col-xs-6 img-item mb-2";
			div.innerHTML = ` <img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}" >
			<div class="image-body">
                      <p style="width: 45%;" class="d-inline-flex justify-content-start ml-2"><i class="far fa-heart mt-1 likes" aria-hidden="true"></i>  ${image.likes}</p> 
                      <p style="width: 40%;" class="d-inline-flex justify-content-end ml-3"><i class="fa fa-eye mt-1 views" aria-hidden="true"></i>  ${image.views}</p></div>`;
			gallery.appendChild(div);
		});
		// End spinner:
		spinner();
	}
};

const getImages = (query) => {
	fetch(
		`https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`
	)
		.then((response) => response.json())
		.then((data) => showImages(data.hits))
		.catch((err) => console.log(err));
};

let slideIndex = 0;
const selectItem = (event, img) => {
	let element = event.target;
	element.classList.toggle("added");

	let item = sliders.indexOf(img);
	if (item === -1) {
		sliders.push(img);
	} else {
		sliders.splice(item, 1);
	}
};
var timer;
const createSlider = () => {
	// check slider image length
	if (sliders.length < 2) {
		alert("Select at least 2 image.");
		return;
	}

	// crate slider previous next area
	sliderContainer.innerHTML = "";
	const prevNext = document.createElement("div");
	prevNext.className =
		"prev-next d-flex w-100 justify-content-between align-items-center";
	prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>`;

	sliderContainer.appendChild(prevNext);
	document.querySelector(".main").style.display = "block";
	// hide image aria
	imagesArea.style.display = "none";
	const inputDuration = document.getElementById("duration").value;
	inputDurationValue = 0;
	if (inputDuration < 0) {
		inputDurationValue = inputDuration * -1;
	} else {
		inputDurationValue = inputDuration;
	}

  // Call selectImages function:
	selectImages();

	const duration = inputDurationValue || 1000;
	sliders.forEach((slide) => {
		let item = document.createElement("div");
		item.className = "slider-item";
		item.innerHTML = `<img class="w-100" src="${slide}"alt="">`;
		sliderContainer.appendChild(item);
	});

	changeSlide(0);
	timer = setInterval(function () {
		slideIndex++;
		changeSlide(slideIndex);
	}, duration);
};

// change slider index
const changeItem = (index) => {
	changeSlide((slideIndex += index));
};

// change slide item
const changeSlide = (index) => {
	const items = document.querySelectorAll(".slider-item");
	if (index < 0) {
		slideIndex = items.length - 1;
		index = slideIndex;
	}

	if (index >= items.length) {
		index = 0;
		slideIndex = 0;
	}

	items.forEach((item) => {
		item.style.display = "none";
	});

	items[index].style.display = "block";
};

searchBtn.addEventListener("click", function () {
	document.querySelector(".main").style.display = "none";
	clearInterval(timer);
	const search = document.getElementById("search");
	getImages(search.value);

	// start Spinner:
	spinner();

	sliders.length = 0;
});

sliderBtn.addEventListener("click", function () {
	createSlider();
});

// Enter button Fix:
var pressEnter = document.getElementById("search");
pressEnter.addEventListener("keyup", function (event) {
	if (event.key === "Enter") {
		event.preventDefault();
		searchBtn.click();
	}
});

// Spinner:
const spinner = () => {
	let spinnerData = document.getElementById("loadingSpinner").classList;
	spinnerData.toggle("d-block");
};

//Show select images:
const selectImages = () => {
	document.getElementById("Image-Box").innerText = "";

	const ImageBox = document.getElementById("Image-Box");

	sliders.forEach((image) => {
		let selectImage = document.createElement("div");
		selectImage.className = "selectImage";
		selectImage.innerHTML = `<img src="${image}">`;

		ImageBox.appendChild(selectImage);
	});
};
