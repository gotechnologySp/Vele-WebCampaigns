import Image from "next/image";

export function VeleWordmark() {
  return (
    <Image
      src="/images/vele-logo-corrido.svg"
      alt="Vele Tecnologia"
      width={180}
      height={180}
      className="h-40 w-40 object-contain sm:h-48 sm:w-48"
    />
  );
}
