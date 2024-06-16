// import { StateCreator } from "zustand";

// import { MatchType } from "~/types/sports.type";

// type MatchState = {
//     events: MatchType[];
//     total: number;
// };

// type MatchActions = {
//     // addProduct: (product: Product) => void;
//     // removeProduct: (productId: string) => void;
//     // incQty: (productId: string) => void;
//     // decQty: (productId: string) => void;
//     // getProductById: (productId: string) => CartProduct | undefined;
//     // setTotal: (total: number) => void;
//     // reset: () => void;
//     initMatch: (matches: MatchType[]) => void;
// };

// export type MatchSlice = MatchState & MatchActions;

// const initialState: MatchState = {
//     events: [],
//     total: 0,
// };

// export const createMatchSlice: StateCreator<
//     MatchSlice,
//     [["zustand/immer", never]],
//     [],
//     MatchSlice
// > = (set) => ({
//     ...initialState,
//     initMatch: (matches: MatchType[]) =>
//         set((state) => {
//             // console.log("matches", matches);
//             state.events = matches;
//             state.total += matches.length;
//         }),
// });

// // const initialState: CartState = {
// // 	products: [],
// // 	total: 0,
// // };
// // export const createCartSlice: StateCreator<
// // 	CartSlice,
// // 	[['zustand/immer', never]],
// // 	[],
// // 	CartSlice
// // > = (set, get) => ({
// // 	...initialState,
// // 	incQty: (productId) =>
// // 		set((state) => {
// // 			const foundProduct = state.products.find(
// // 				(product) => product.id === productId
// // 			);
// // 			if (foundProduct) {
// // 				foundProduct.qty += 1;
// // 			}
// // 		}),
// // 	decQty: (productId) =>
// // 		set((state) => {
// // 			const foundIndex = state.products.findIndex(
// // 				(product) => product.id === productId
// // 			);

// // 			if (foundIndex !== -1) {
// // 				if (state.products[foundIndex].qty === 1) {
// // 					state.products.splice(foundIndex, 1);
// // 				} else {
// // 					state.products[foundIndex].qty -= 1;
// // 				}
// // 			}
// // 		}),
// // 	addProduct: (product) =>
// // 		set((state) => {
// // 			state.products.push({ ...product, qty: 1 });
// // 		}),
// // 	removeProduct: (productId) =>
// // 		set((state) => {
// // 			state.products = state.products.filter(
// // 				(product) => product.id !== productId
// // 			);
// // 		}),
// // 	getProductById: (productId) =>
// // 		get().products.find((product) => product.id === productId),
// // 	setTotal: (total) =>
// // 		set((state) => {
// // 			state.total = total;
// // 		}),

// // 	reset: () => set(() => initialState),
// // });
