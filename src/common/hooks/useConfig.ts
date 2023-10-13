import { useContext } from 'react';
import { ConfigContext } from '@package:src/common/contexts/ConfigContext';

// ==============================|| CONFIG - HOOKS ||============================== //

const useConfig = () => useContext(ConfigContext);

export default useConfig;
