import { KeyedObject } from '@package:src/common/types';
import { GroupEntity } from '@package:src/domain/entities/Group';

// * Define user entity type
export class UserEntity {
    id: string;
    username: string;
    avatar: string | null;
    phoneNumber: string;
    email: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
    passwordChangedAt?: string;
    deletedAt: string | null;
    groupId?: string;
    groupName?: string;
    group?: GroupEntity;

    fromUserModelToAuth(userModel: KeyedObject) {
        return {
            user: {
                id: userModel?.data?.user?.id,
                username: userModel?.data?.user?.username,
                phoneNumber: userModel?.data?.user?.phoneNumber,
                email: userModel?.data?.user?.email,
                group: userModel?.data?.user?.group
            } as UserEntity,
            message: userModel?.message,
            status: userModel?.status,
            accessToken: userModel?.data?.accessToken,
            refreshToken: userModel?.data?.refreshToken
        } as KeyedObject;
    }

    fromUserModelToUserAdmin(userModel: KeyedObject) {
        const listUsers: UserEntity[] = [];

        userModel?.data?.items.map((item: UserEntity) => {
            listUsers.push({
                id: item?.id,
                username: item?.username,
                avatar: item?.avatar,
                phoneNumber: item?.phoneNumber,
                email: item?.email,
                status: item?.status,
                createdAt: item?.createdAt,
                updatedAt: item?.updatedAt,
                deletedAt: item?.deletedAt,
                groupId: item?.group?.id,
                groupName: item?.group?.name
            } as UserEntity);
        });
        return {
            users: listUsers,
            message: userModel?.message,
            status: userModel?.status
        } as KeyedObject;
    }
}
