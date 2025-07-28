import axiosInstace from './axiosInstance'

export async function loginUser(email, password) {
    try {
        const res = await axiosInstace.post(`/auth/login`, {
            email,
            password,
        });

        const data = res.data;

        console.log(data);

        if (res.status == 200) {
            return {
                success: true,
                message: data.message,
            };
        } else {
            return {
                success: false,
                message: data.message || 'Login gagal',
            };
        }
    } catch (err) {
        return {
            success: false,
            message: err.response?.data?.message || 'Terjadi kesalahan saat login',
        };
    }
}


export function logout(router){
    try {
        localStorage.removeItem('token');
        router.push('/login');
    } catch (error) {
        console.log(error);
    }
}