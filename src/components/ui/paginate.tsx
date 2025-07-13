import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
} from '@/components/ui/pagination'
import { cn } from '@/lib/utils'

type PaginationProps = {
	currentPage: number
	totalPages: number
}

export const Paginate = ({ currentPage, totalPages }: PaginationProps) => {
	return (
		<Pagination>
			<PaginationContent className="w-full justify-between">
				<PaginationItem>
					<PaginationLink
						aria-disabled={currentPage === 1 ? true : undefined}
						aria-label="Ir para a página anterior"
						className={cn(
							'aria-disabled:pointer-events-none aria-disabled:opacity-50',
							buttonVariants({
								variant: 'outline',
							})
						)}
						href={currentPage === 1 ? undefined : `#/page/${currentPage - 1}`}
						role={currentPage === 1 ? 'link' : undefined}
					>
						<ChevronLeftIcon aria-hidden="true" size={16} />
					</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<p aria-live="polite" className="text-muted-foreground text-sm">
						Página <span className="text-foreground">{currentPage}</span> de{' '}
						<span className="text-foreground">{totalPages}</span>
					</p>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink
						aria-disabled={currentPage === totalPages ? true : undefined}
						aria-label="Ir para a próxima página"
						className={cn(
							'aria-disabled:pointer-events-none aria-disabled:opacity-50',
							buttonVariants({
								variant: 'outline',
							})
						)}
						href={
							currentPage === totalPages
								? undefined
								: `#/page/${currentPage + 1}`
						}
						role={currentPage === totalPages ? 'link' : undefined}
					>
						<ChevronRightIcon aria-hidden="true" size={16} />
					</PaginationLink>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	)
}
