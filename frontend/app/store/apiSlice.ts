import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/' }),
	endpoints: (builder) => ({
		getCars: builder.query<GetPageResponse, number>({
			query: (id) => ({
				url: `${id}`,
			}),
		}),
		getCar: builder.query<CarData, number>({
			query: (id) => ({
				url: `car/${id}`,
			}),
		}),
	}),
})

export const { useGetCarsQuery, useGetCarQuery } = apiSlice
