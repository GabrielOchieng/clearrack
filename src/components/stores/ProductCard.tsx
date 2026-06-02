import Image from "next/image";

interface Props {
  id: string;
  name: string;
  price: number;
  size: string;
  categoryName: string;
  image: string;
  isSold: boolean;
}

export default function ProductCard({
  name,
  price,
  size,
  categoryName,
  image,
  isSold,
}: Props) {
  return (
    <div className="group relative">
      <div className="aspect-square overflow-hidden rounded-lg bg-zinc-100">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        {isSold && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="font-black text-white uppercase tracking-widest">
              Sold
            </span>
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-[10px] uppercase font-bold text-zinc-500">
          {categoryName}
        </p>
        <h3 className="font-semibold text-zinc-900">{name}</h3>
        <p className="font-black">Ksh {price.toLocaleString()}</p>
      </div>
    </div>
  );
}
