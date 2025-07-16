import { PageTemplate } from '@/components/templates/page-template'
import { Skeleton } from '@/components/ui/skeleton'

const LoadingContent = () => {
	return (
		<div className="h-fit space-y-4 transition-all">
			<div className="space-y-2">
				<Skeleton className="h-5 w-40 rounded-sm" />
				<Skeleton className="h-5 w-48 rounded-sm" />
			</div>
			<div className="space-y-2">
				<Skeleton className="h-10 w-full" />
				<Skeleton className="h-10 w-full" />
				<Skeleton className="h-10 w-full" />
				<Skeleton className="h-10 w-full" />
			</div>
		</div>
	)
}

export default function Loading() {
	return (
		<PageTemplate content={LoadingContent} horizontalLogo title="Carregando" />
	)
}
