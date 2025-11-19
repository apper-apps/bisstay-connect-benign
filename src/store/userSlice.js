import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  isInitialized: false,
  userRole: 'company', // 'owner' or 'company'
  permissions: [],
  ownerId: null,
  companyId: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      // CRITICAL: Always use deep cloning to avoid reference issues
      // This prevents potential issues with object mutations
      state.user = JSON.parse(JSON.stringify(action.payload));
      state.isAuthenticated = !!action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setInitialized: (state, action) => {
      state.isInitialized = action.payload;
    },
setUserRole: (state, action) => {
      state.userRole = action.payload;
    },
    setUserContext: (state, action) => {
      const { ownerId, companyId, permissions } = action.payload;
      state.ownerId = ownerId;
      state.companyId = companyId;
      state.permissions = permissions || [];
    },
  },
});

export const { setUser, clearUser, setInitialized, setUserRole, setUserContext } = userSlice.actions;

// Selectors
export const selectUser = (state) => state.user.user;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectUserRole = (state) => state.user.userRole;
export const selectOwnerId = (state) => state.user.ownerId;
export const selectCompanyId = (state) => state.user.companyId;
export const selectPermissions = (state) => state.user.permissions;
export default userSlice.reducer;