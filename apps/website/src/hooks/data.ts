import { useMutation as useM, useQueryClient, useSuspenseQuery as useSQ, MutationFunction } from "@tanstack/react-query"


export function useMutation<Telefunction extends (arg: any) => any>(telefunction: Telefunction) {
    const queryClient = useQueryClient()
    return useM<Awaited<ReturnType<Telefunction>>, Error, Parameters<Telefunction>[0]>({
        mutationFn: telefunction,
        onSettled(...args) {
            queryClient.invalidateQueries()
        }
    })
}

export function useData<Telefunction extends (...args: any[]) => any>(telefunction: Telefunction, ...args: Parameters<Telefunction>) {
    //@ts-ignore
    const telefunctionKey = telefunction._key;
    const queryKey = [telefunctionKey, ...args]
    return useSQ<Awaited<ReturnType<Telefunction>>, Error, Awaited<ReturnType<Telefunction>>>({
        queryFn: () => telefunction(...args),
        queryKey
    })
}
