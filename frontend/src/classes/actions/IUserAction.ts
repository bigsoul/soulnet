export const USER_LOCAL_STORAGE_LOAD = "USER/LOCAL-STORAGE-LOAD";

export interface IUserLocalStorageLoadAction {
	type: typeof USER_LOCAL_STORAGE_LOAD;
	serviceUrl: string;
	serviceJwtToken: string;
}

export type TUserAction = IUserLocalStorageLoadAction;

export default TUserAction;
