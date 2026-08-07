import Image from "next/image";

export function VeleMark() {
  return (
    <Image
      src="/icon.svg"
      alt="Vele"
      width={40}
      height={40}
      priority
      className="h-10 w-10 rounded-full"
    />
  );
}
