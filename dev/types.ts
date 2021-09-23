export type Reducer<K extends string> = {
	[key in K]: boolean
}
