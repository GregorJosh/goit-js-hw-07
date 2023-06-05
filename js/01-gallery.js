import { galleryItems } from "./gallery-items.js";
import basicLightbox from "https://cdn.jsdelivr.net/npm/basiclightbox@5.0.4/+esm";

const galleryULElement = document.querySelector("ul.gallery");
const onEscapeKeyEvent = (event) => {
  event.preventDefault();

  if (event.key === "Escape" && basicLightboxInstance) {
    basicLightboxInstance.close();
    basicLightboxInstance = null;
  }
};
const onGalleryItemClick = (event) => {
  event.preventDefault();

  if (event.target.nodeName === "IMG") {
    const { alt } = event.target;
    const { href } = event.target.parentElement;

    basicLightboxInstance = basicLightbox.create(
      `<img src="${href}" alt="${alt}" />`,
      {
        onClose: (instance) => {
          galleryULElement.removeEventListener("keyup", onEscapeKeyEvent);
        }
      },
    );
    basicLightboxInstance.show();

    galleryULElement.addEventListener("keyup", onEscapeKeyEvent);
  }
};

let basicLightboxInstance = null;

galleryULElement.insertAdjacentHTML(
  "afterbegin",
  galleryItems
    .map(
      ({ preview, original, description }) => `
        <li class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}" />
            </a>
        </li>
    `
    )
    .join("")
);

galleryULElement.addEventListener("click", onGalleryItemClick);
