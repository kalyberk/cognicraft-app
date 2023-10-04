import Image from "next/image";
import styles from "@/styles/ImageGrid.module.css";

export const ImageGrid = ({ images, selectedImageIdx, onImageClick }) => {
  return (
    <div className={styles['grid']}>
      {images.map((image, index) => {
        const isSelected = index === selectedImageIdx;
        return (
          <div
            className={`${styles['grid-item']} ${isSelected ? styles['selected'] : ''}`}
            key={index}
            onClick={onImageClick ? () => onImageClick(index) : null}
          >
            <Image
              src={image.url}
              alt={`Image ${index + 1}`}
              fill
              sizes="100vw"
            />
          </div>
        )
      })}
    </div>
  );
};
