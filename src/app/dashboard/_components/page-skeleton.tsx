export const PageSkeleton = () => {
	return (
		<div>
			{Array.from({ length: 3 }, (_, index) => (
				<div
					className="h-14 w-full animate-pulse border-b bg-accent/20"
					key={`${index}-${Date.now()}`}
				/>
			))}
		</div>
	)
}
