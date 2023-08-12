let numImages = 4;
let images = [];

for (let i = 1; i <= numImages; i++) {
    images.push(`../../album/${i}.jpeg`);
}

let currentPage = 0;
let img;
let isLoadingImage = false;

function preload() {
    img = loadImage(images[currentPage]);
}

function setup() {
    let canvas = createCanvas(windowWidth - 300, windowHeight - 200);
    canvas.style('display', 'block');
    canvas.style('padding-top', '6vh');
    canvas.style('padding-bottom', '10vh');
    canvas.style('margin-left', '10vh');
    canvas.position(windowWidth / 2 - width / 2, windowHeight / 2 - height / 2);
    textAlign(CENTER, CENTER);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    canvas.position(windowWidth / 2 - width / 2, windowHeight / 2 - height / 2);
}

function draw() {
    clear();
    //   background(220);

    let imgWidth = img.width;
    let imgHeight = img.height;
    let canvasRatio = width / height;
    let imgRatio = imgWidth / imgHeight;
    let scale;

    if (canvasRatio > imgRatio) {
        scale = height / imgHeight;
    } else {
        scale = width / imgWidth;
    }

    let newWidth = imgWidth * scale;
    let newHeight = imgHeight * scale;
    let xOffset = (width - newWidth) / 2;
    let yOffset = (height - newHeight) / 2;

    image(img, xOffset, yOffset, newWidth, newHeight);

    textSize(24);
    fill(0);
    text(`Page ${currentPage + 1}`, width / 2, height - 20);

    stroke(255);
    noFill();
    rect(20, height / 2 - 20, 40, 40);
    rect(width - 60, height / 2 - 20, 40, 40);
    fill(255);
    triangle(30, height / 2, 50, height / 2 - 10, 50, height / 2 + 10);
    triangle(width - 30, height / 2, width - 50, height / 2 - 10, width - 50, height / 2 + 10);
}

function mouseClicked() {
    if (mouseX > 20 && mouseX < 60 && mouseY > height / 2 - 20 && mouseY < height / 2 + 20) {
        if (currentPage === 0) {
            currentPage = images.length - 1;
        } else {
            currentPage--;
        }
    }

    if (mouseX > width - 60 && mouseX < width - 20 && mouseY > height / 2 - 20 && mouseY < height / 2 + 20) {
        if (currentPage === images.length - 1) {
            currentPage = 0;
        } else {
            currentPage++;
        }
    }

    if (!isLoadingImage) {
        isLoadingImage = true;
        loadImage(images[currentPage], function (newImg) {
            img = newImg;
            isLoadingImage = false;
        });
    }
}


