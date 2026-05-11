import MOCK_USERS from "../mockdata/mock_users";

const REGISTERED_USERS_KEY = "registeredUsers";

const mapUserShape = (user) => ({
  uid: String(user.id ?? Date.now()),
  displayName: user.name,
  name: user.name,
  email: user.email,
  cellphone: user.cellphone ?? "",
  address: user.address ?? "",
  emailVerified: true,
});

const getRegisteredUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(REGISTERED_USERS_KEY) || "[]");
  } catch {
    return [];
  }
};

export const loginUser = async (email, password) => {
  const registeredUsers = getRegisteredUsers();
  const allUsers = [...MOCK_USERS, ...registeredUsers];
  const foundUser = allUsers.find(
    (user) => user.email === email && user.password === password,
  );

  if (!foundUser) {
    return { success: false, error: "Correo o contraseña incorrectos" };
  }

  const normalizedUser = mapUserShape(foundUser);

  return { success: true, user: normalizedUser };
};

export const registerFullUser = async (userData) => {
  const registeredUsers = getRegisteredUsers();
  const allUsers = [...MOCK_USERS, ...registeredUsers];
  const emailExists = allUsers.some(
    (user) => user.email.toLowerCase() === userData.email.toLowerCase(),
  );

  if (emailExists) {
    return { success: false, error: "El email ya está registrado." };
  }

  const newUser = {
    id: Date.now(),
    name: userData.name,
    email: userData.email,
    cellphone: userData.cellphone ?? "",
    address: userData.address ?? "",
    password: userData.password,
  };

  localStorage.setItem(
    REGISTERED_USERS_KEY,
    JSON.stringify([...registeredUsers, newUser]),
  );

  return { success: true, user: mapUserShape(newUser) };
};

export const logoutUser = async () => {
  return { success: true };
};
