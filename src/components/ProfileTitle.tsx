const title = "Ingénieur de données et de bases de données";

export function ProfileTitle() {
  return (
    <h1 className="relative font-semibold leading-tight">
      <span className="sr-only">{title}</span>
      <svg aria-hidden="true" width="100%" className="block h-[156px] sm:h-[192px]" xmlns="http://www.w3.org/2000/svg">
        <foreignObject width="100%" height="100%">
          <div className="text-3xl sm:text-5xl leading-tight font-semibold tracking-normal">
            Ingénieur de données<br />
            <span className="text-primary">et de bases de données</span>
          </div>
        </foreignObject>
      </svg>
    </h1>
  );
}