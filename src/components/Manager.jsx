import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {

    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])
    const [editId, setEditId] = useState(null)
    const [visiblePasswords, setVisiblePasswords] = useState({});

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        setPasswordArray(passwords)
    }

    useEffect(() => {
        getPasswords()
    }, [])

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        navigator.clipboard.writeText(text)
    }

    const showPassword = () => {
        if (passwordRef.current.type === "password") {
            ref.current.src = "icons/eyecross.png"
            passwordRef.current.type = "text"
        }
        else {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "password"
        }
    }

    const savePassword = async () => {
        let res
        if (editId) {
            res = await fetch("http://localhost:3000/", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: editId }) })
            setEditId(null)

            toast('Password edited!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
        else {
            res = await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })

            toast('Password saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }

        // localStorage.setItem("passwords", JSON.stringify(updatedPasswords))
        if (res.ok) {
            await getPasswords();
        }

        setform({
            site: "",
            username: "",
            password: ""
        })
    }

    const deletePassword = async (id) => {
        let c = confirm("Do you really want to delete your Password ?")
        if (!c) return;
        // localStorage.setItem("passwords", JSON.stringify(dPasswords))
        let res = await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })

        if (res.ok) {
            toast('Password deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });

            await getPasswords()
        }
    }

    const editPassword = (id) => {
        const passwordToEdit = passwordArray.find(item => item.id === id)
        setform(passwordToEdit)
        setEditId(id);
    }


    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const togglePassword = (id) => {
        setVisiblePasswords((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (


        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="dark"
                transition={Bounce}
            />


            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
                <h1 className=' text-2xl sm:text-3xl md:text-4xl font-bold text-center'>
                    <span className='text-green-500'>&lt;</span>
                    Pass
                    <span className='text-green-500'>Hero/&gt;</span>
                </h1>
                <p className='text-base md:text-lg text-center'>Your own Password Manager</p>

                <div className=" text-black flex flex-col p-4 gap-4 md:gap-8 w-full">
                    <input name='site' value={form.site} onChange={handleChange} placeholder='Enter website URL' className='w-full rounded-full border border-green-500 bg-white p-4 py-2' type="text" />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                        <input name='username' value={form.username} onChange={handleChange} placeholder='Enter username' className='flex-1 rounded-full bg-white border border-green-500 w-full p-4 py-2' type="text" />
                        <div className="relative flex-1 w-full">
                            <input ref={passwordRef} name='password' value={form.password} onChange={handleChange} placeholder='Enter password' className='w-full rounded-full border border-green-500 bg-white p-4 py-2' type="password" />
                            <span className="absolute right-0.75 top-0.75 cursor-pointer" onClick={showPassword}>
                                <img ref={ref} className='p-1 mt-0.75 mr-1' width={30} src="icons/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>

                    <button onClick={savePassword} className='w-full md:w-auto flex justify-center items-center gap-2 rounded-full bg-green-500 px-8 py-2 font-bold'>
                        <lord-icon
                            src="https://cdn.lordicon.com/efxgwrkc.json"
                            trigger="hover">
                        </lord-icon>
                        {editId ? "Update" : "Save"}</button>
                </div>

                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>

                    {passwordArray.length === 0 && <div> No passwords to show </div>}
                    {passwordArray.length != 0 &&
                        <div className="overflow-x-auto">
                            <table className="table-auto min-w-175 w-full text-sm md:text-base rounded-md">
                                <thead className='bg-green-800 text-white '>
                                    <tr>
                                        <th className='py-2'>Sites</th>
                                        <th className='py-2'>Usernames</th>
                                        <th className='py-2'>Passwords</th>
                                        <th className='py-2'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-green-200'>
                                    {passwordArray.map((item) => {
                                        return <tr key={item.id}>
                                            <td className='py-2 px-2 md:px-4 border border-white text-center'>
                                                <div className='flex-center'>
                                                    <a href={item.site} className='break-all' target="_blank"> {item.site}</a>
                                                    <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                        <lord-icon
                                                            style={{ "width": "25px", "height": "25px", "paddingTop": "4px", "paddingLeft": "3px" }}
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover">
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='py-2 px-2 md:px-4 border border-white text-center'>
                                                <div className='flex-center'>
                                                    <span>{item.username}</span>
                                                    <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                        <lord-icon
                                                            style={{ "width": "25px", "height": "25px", "paddingTop": "4px", "paddingLeft": "3px" }}
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover">
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-2 px-2 md:px-4 border border-white text-center">
                                                <div className="flex-center gap-2">

                                                    <span>
                                                        {visiblePasswords[item.id]
                                                            ? item.password
                                                            : "••••••••"}
                                                    </span>

                                                    {/* Eye Icon */}
                                                    <img
                                                        src={
                                                            visiblePasswords[item.id]
                                                                ? "icons/eyecross.png"
                                                                : "icons/eye.png"
                                                        }
                                                        alt="toggle"
                                                        className="w-5 cursor-pointer"
                                                        onClick={() => togglePassword(item.id)}
                                                    />

                                                    {/* Copy Icon */}
                                                    <div
                                                        className="lordiconcopy size-7 cursor-pointer"
                                                        onClick={() => copyText(item.password)}
                                                    >
                                                        <lord-icon
                                                            style={{
                                                                width: "25px",
                                                                height: "25px",
                                                                paddingTop: "4px",
                                                                paddingLeft: "3px",
                                                            }}
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover"
                                                        >
                                                        </lord-icon>
                                                    </div>

                                                </div>
                                            </td>
                                            <td className='py-2 px-2 md:px-4 border border-white text-center'>
                                                <span onClick={() => { editPassword(item.id) }} className='cursor-pointer mx-1'>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/gwlusjdu.json"
                                                        trigger="hover"
                                                        style={{ "width": "25px", "height": "25px" }}>
                                                    </lord-icon>
                                                </span>
                                                <span onClick={() => { deletePassword(item.id) }} className='cursor-pointer mx-1'>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/skkahier.json"
                                                        trigger="hover"
                                                        style={{ "width": "25px", "height": "25px" }}>
                                                    </lord-icon>
                                                </span>
                                            </td>
                                        </tr>
                                    })}

                                </tbody>
                            </table>
                        </div>
                    }
                </div>
            </div>

        </>
    )
}

export default Manager
