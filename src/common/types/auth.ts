// project imports
import { UserEntity } from '@package:src/domain/entities/User';
import { Either } from '@package:src/common/utils/either.response';
import AppError from '@package:src/common/utils/app.error';

export type Auth0ContextType = {
    isLoggedIn: boolean;
    isInitialized?: boolean;
    user?: UserEntity | null | undefined;
    login: () => void;
};

export interface JWTDataProps {
    userId: string;
}

export type JWTContextType = {
    isLoggedIn: boolean;
    isInitialized?: boolean;
    user?: UserEntity | null | undefined;
    login: (email: string, password: string) => Promise<Either<string, AppError>>;
    register: (email: string, password: string, passwordConfirm: string) => Promise<Either<string, AppError>>;
};

export interface InitialLoginContextProps {
    isLoggedIn: boolean;
    isInitialized?: boolean;
    user?: UserEntity | null | undefined;
}
