import { useState, useEffect } from 'react';
import api from "../api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { validarUsuario, validarContraseña, validarNombre, validarApellido, validarEmail, validarFechaNacimiento, 
  actualizarPlaceholderTelefono, validarTelefonoNumero } from "../utils/Validaciones";

export default function Registration() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    email: '',
    profile: {
      date_birth: '',
      roles: 'user',
      genero: '',
      pais: '',
      telefono: ''
    }
  });
  const [errors, setErrors] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    date_birth: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [error, setError] = useState('');
  //validacion contraseña
  const [passwordMessage, setPasswordMessage] = useState(""); // mensaje
  const [passwordMessageType, setPasswordMessageType] = useState(""); // "error" | "ok"
  //validacion change contraseña
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passChangeMessage, setPassChangeMessage] = useState(""); // mensaje
  const [passChangeMessageType, setPassChangeMessageType] = useState(""); // "error" | "ok"
  //validacion telefono
  const [phoneError, setPhoneError] = useState('');
  
  //placeholder por defecto al cambiar de pais si no hay nada en el input de telefono o al recargar la pagina
  useEffect(() => {
      const cleanup = actualizarPlaceholderTelefono("pais", "telefono");
      return cleanup;
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    
  /* Si es parte del perfil
    Utilizamos "prev" ya que contiene el estado anterior mas reciente ya que si usamos formData podemos perder datos
  En objetos anidados pasa mucho*/
    if (["date_birth", "roles", "genero", "pais", "telefono"].includes(name)) {
      setFormData(prev => ({
        ...prev,
        profile: {
          ...prev.profile,
          [name]: value
        }
      }));
    } else {
      // Si es un campo normal
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

  //validaciones por campo
  let errorMsg = "";
    if (name === "username") {
      errorMsg = validarUsuario(value);
    }
    if (name === "first_name") {
      errorMsg = validarNombre(value);
    } 
    if (name === "last_name") {
      errorMsg = validarApellido(value);
    } 
    if (name === "email") {
      errorMsg = validarEmail(value);
    }
    if (name === "fecha_nacimiento") {
      errorMsg = validarFechaNacimiento(value);
    }

  // Actualizar errores
    setErrors(prev => ({
      ...prev,
      [name]: errorMsg
    }));
    
  //Validacion contraseña
    if (name === "password") {

      if(!validarContraseña(value)){
        setPasswordMessage("La contraseña debe tener min 8 caracteres, al menos una mayúscula, una minúscula, un número y un símbolo");
        setPasswordMessageType("error")
      } else {
        setPasswordMessage("Contraseña válida");
        setPasswordMessageType("ok")
      }
      
    }
  };

  const handleChangePassword = (e) =>{
    const value = e.target.value;
    setConfirmPassword(value);

    if (formData.password !== value) {
      setPassChangeMessage("Las contraseñas no coinciden");
      setPassChangeMessageType("error");
    } else {
      setPassChangeMessage("Las contraseñas coinciden");
      setPassChangeMessageType("ok");
    }
  }

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    setError('');
    try{
      const res = await api.post("/api/users/crear",formData)
        alert('Registro completado con éxito 🩺');
        navigate("/login")
    }catch(error){
      alert(error)
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Crear cuenta</h2>
        <p className="register-subtitle">Regístrate para gestionar tus recordatorios médicos</p>

        <form className="register-form" onSubmit={handleSubmit}>
          <label>Nombre</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="Tu nombre"
            required
          />
          {errors.first_name && (
            <label style={{ color: "red", fontSize: "12px", display: "block", marginTop: "4px" }}>
              {errors.first_name}
            </label>
          )}

          <label>Apellidos</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Tus apellidos"
            required
          />
          {errors.last_name && (
            <label style={{ color: "red", fontSize: "12px", display: "block", marginTop: "4px" }}>
              {errors.last_name}
            </label>
          )}

          <label>Usuario</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Crea tu usuario"
            required
          />
          {errors.username && (
            <label style={{ color: "red", fontSize: "12px", display: "block", marginTop: "4px" }}>
              {errors.username}
            </label>
          )}

          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Crea una contraseña"
            required
          />
          {passwordMessage && (
            <label style={{
              color: passwordMessageType === "error" ? "red" : "green",
              fontSize: "12px",
              marginTop: "4px"
            }}>
              {passwordMessage}
            </label>
          )}

          <label>Confirmar contraseña</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChangePassword}
            placeholder="Repite la contraseña"
            required
          />
          {passChangeMessage && (
            <label style={{
              color: passChangeMessageType === "error" ? "red" : "green",
              fontSize: "12px",
              marginTop: "4px"
            }}>
              {passChangeMessage}
            </label>
          )}

          <label>Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
            required
          />
          {errors.email && (
            <label style={{ color: "red", fontSize: "12px", display: "block", marginTop: "4px" }}>
              {errors.email}
            </label>
          )}

          <label>Fecha de nacimiento</label>
          <input
            type="date"
            name="date_birth"
            value={formData.date_birth}
            onChange={handleChange}
            required
          />
          {errors.date_birth && (
            <label style={{ color: "red", fontSize: "12px", display: "block", marginTop: "4px" }}>
              {errors.date_birth}
            </label>
          )}

          <label>Genero</label>
          <select 
            className="genero" 
            name="genero" 
            id="genero" 
            value={formData.genero} 
            onChange={handleChange}
            >
              <option value="" disabled>Selecciona genero...</option>
              <option value="hombre">Hombre</option>
              <option value="mujer">Mujer</option>
              <option value="no_decir">Prefiero no decirlo</option>
          </select>

          <label>Teléfono</label>
          <div className="phone-combo" id="phone">
            <div className="select-wrap" aria-hidden="false">
              <select 
                name="pais" 
                id="pais" 
                aria-label="Seleccionar país"
                value={formData.pais}
                
                onChange={(e) => {
                const country = e.target.value; 
                // handleChange ahora llama desde profile
                handleChange({
                  target: {
                    name: "pais",
                    value: country
                  }});
                setPhoneError('');  
              }}
                >
                  <option value="+34">🇪🇸 +34</option>
                  <option value="+49">🇩🇪 +49</option>
              </select>
            </div>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.profile.telefono}
              onChange={(e) => {
                const numeros = e.target.value.replace(/[^0-9]/g, ""); // filtra todo lo que no sea número
                // handleChange ahora llama desde profile
                handleChange({
                  target: {
                    name: "telefono",
                    value: numeros
                  }});
                
                // Validación en tiempo real
                const countryCode = formData.profile.pais || "+34"; // default si no hay
                const errorMsg = validarTelefonoNumero(countryCode, numeros);
                setPhoneError(errorMsg);
              }}

              required
            />
          </div>
          {/* Mensaje de error debajo del input */}
          {phoneError && (
            <label style={{ color: 'red', fontSize: '12px', marginTop: '4px', display: 'block' }}>
              {phoneError}
            </label>
          )}

          {error && <p className="error-msg">{error}</p>}

          <button type="submit" className="register-btn">Registrarse</button>
        </form>
        
        <p className="login-footer">
          ¿Ya tienes cuenta? <Link className="register-link" to="/login">Inicia sesión</Link>
        </p>
      </div>
        <footer className="login-footer">
          <small>© {new Date().getFullYear()} MediAcción</small>
        </footer>
    </div>
  );
}
