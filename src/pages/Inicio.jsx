import { Link } from 'react-router-dom'
import '../css/inicio.css'

// Página de inicio (landing). Es solo contenido estático: no necesita estado.
// Truco del fondo: el <input id="toggle-fondo"> y el <label htmlFor="toggle-fondo">
// funcionan con CSS puro (selector :checked), por eso no hace falta JavaScript.
function Inicio() {
  return (
    <div className="pg-inicio">
      <input type="checkbox" id="toggle-fondo" />
      <div className="fondo">
        <nav className="navbar">
          <div className="nav-container">
            <div className="logo">
              <img src="/academixlogo.jpg" alt="Academix Logo" />
            </div>
            <div className="nav-buttons">
              <Link to="/login" className="btn btn-secondary">Iniciar Sesión</Link>
              <Link to="/registro" className="btn btn-secondary">Regístrate</Link>
              <a href="#" className="btn btn-primary">Solicitar Demo</a>
              <label htmlFor="toggle-fondo" className="btn btn-cambiar-fondo">Cambiar Fondo</label>
            </div>
          </div>
        </nav>
        <section className="hero">
          <div className="hero-content">
            <video src="/academixinicio.mp4" autoPlay loop muted playsInline className="hero-logo" />
            <h1>Gestión de Notas Moderna</h1>
            <h2>Para Instituciones Educativas del Futuro</h2>
            <p>
              Diga adiós a los cuadernos y planillas manuales. Academix facilita la gestión académica,
              mejora la comunicación y brinda transparencia total a estudiantes, docentes y acudientes.
            </p>
            <div className="hero-buttons">
              <Link to="/registro" className="btn btn-primary btn-large">Regístrate Gratis</Link>
              <Link to="/login" className="btn btn-secondary btn-large">Iniciar Sesión</Link>
            </div>
          </div>
        </section>
        <section className="section">
          <h2 className="section-title">¿Para Quién es Academix?</h2>
          <p className="section-subtitle">Una solución integral que beneficia a toda la comunidad educativa</p>
          <div className="users-grid">
            <div className="user-card">
              <div className="user-icon">👨‍🏫</div>
              <h3>Docentes</h3>
              <p>
                Registra y actualiza calificaciones en segundos. Deja comentarios personalizados
                y ahorra horas de trabajo manual cada semana.
              </p>
            </div>
            <div className="user-card">
              <div className="user-icon">🎓</div>
              <h3>Estudiantes</h3>
              <p>
                Consulta tus notas en cualquier momento, conoce tu promedio en tiempo real
                y lee la retroalimentación de tus profesores.
              </p>
            </div>
            <div className="user-card user-card-premium">
              <div className="premium-badge-card">👑 PREMIUM</div>
              <div className="user-icon">👨‍👩‍👧</div>
              <h3>Acudientes</h3>
              <p>
                Mantente informado sobre el rendimiento académico de tus hijos.
                Accede desde cualquier lugar, en cualquier momento.
              </p>
            </div>
          </div>
        </section>
        <section className="features-section" id="caracteristicas">
          <div className="section">
            <h2 className="section-title">¿Por Qué Elegir Academix?</h2>
            <p className="section-subtitle">Características diseñadas para instituciones modernas</p>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🔓</div>
                <h3>Transparencia Total</h3>
                <p>
                  Acceso 24/7 a calificaciones desde cualquier dispositivo. Los comentarios
                  de los docentes ayudan a entender el progreso de cada estudiante.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔄</div>
                <h3>Flexibilidad Completa</h3>
                <p>
                  Compatible con cualquier nivel educativo: primaria, secundaria o universidad.
                  Funciona en celular, tablet y computador.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3>Fácil de Usar</h3>
                <p>
                  Implementación sencilla sin capacitación compleja. Interfaz intuitiva
                  que cualquier persona puede usar desde el primer día.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🎯</div>
                <h3>Control Administrativo</h3>
                <p>
                  Permisos de administrador para directivos. Notificaciones automáticas
                  cuando se actualizan notas. Seguimiento en tiempo real.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="section">
          <h2 className="section-title">¿Cómo Funciona?</h2>
          <p className="section-subtitle">Implementación simple en 3 pasos</p>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Registro de la Institución</h3>
                <p>
                  Crea tu cuenta institucional en minutos. Configura los grupos,
                  materias y usuarios (docentes, estudiantes, acudientes).
                </p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Los Docentes Registran Notas</h3>
                <p>
                  Los profesores ingresan calificaciones desde su panel. El sistema
                  calcula promedios automáticamente y envía notificaciones.
                </p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Acceso Inmediato para Todos</h3>
                <p>
                  Estudiantes y acudientes consultan notas en tiempo real.
                  Los administradores monitorean el proceso completo.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="about-section">
          <div className="section">
            <h2 className="section-title">Quiénes Somos</h2>
            <div className="about-content">
              <p>
                <strong>Academix</strong> es un proyecto desarrollado por estudiantes del
                <strong>CESDE</strong> con el propósito de optimizar la gestión de notas y
                mejorar la comunicación dentro de las instituciones académicas.
              </p>
              <p>
                Aplicamos metodología <strong>Scrum</strong> y las mejores prácticas de
                desarrollo para crear una solución moderna, segura y escalable que
                realmente resuelve los problemas de la educación actual.
              </p>
              <div className="team-badge">
                🎓 Desarrollado por Estudiantes para Educadores
              </div>
            </div>
          </div>
        </section>
        <section className="pricing-section">
          <div className="section">
            <h2 className="section-title">Planes Diseñados para tu Institución</h2>
            <p className="section-subtitle">Elige el plan que mejor se adapte a tus necesidades</p>
            <div className="pricing-grid">
              <div className="pricing-card">
                <div className="plan-header">
                  <h3>Plan Básico</h3>
                  <div className="price">
                    <span className="price-amount">GRATIS</span>
                  </div>
                  <p className="plan-description">Perfecto para comenzar</p>
                </div>
                <ul className="plan-features">
                  <li>✓ Acceso para Estudiantes</li>
                  <li>✓ Acceso para Docentes</li>
                  <li>✓ Registro de Calificaciones</li>
                  <li>✓ Visualización en Tiempo Real</li>
                  <li>✓ Cálculo Automático de Promedios</li>
                  <li>✓ Interfaz Responsive</li>
                  <li className="feature-disabled">✗ Acceso para Acudientes</li>
                  <li className="feature-disabled">✗ Contacto Directo con Docentes</li>
                  <li className="feature-disabled">✗ Notificaciones Automáticas</li>
                  <li className="feature-disabled">✗ Reportes PDF Avanzados</li>
                </ul>
                <Link to="/registro" className="btn-plan btn-plan-basic">Comenzar Gratis</Link>
              </div>
              <div className="pricing-card pricing-card-premium">
                <div className="popular-badge">⭐ MÁS POPULAR</div>
                <div className="plan-header">
                  <h3>Plan Premium</h3>
                  <div className="price">
                    <span className="price-currency">$</span>
                    <span className="price-amount">120.000</span>
                    <span className="price-period">/anual</span>
                  </div>
                  <p className="plan-description">Gestión completa e integral</p>
                </div>
                <ul className="plan-features">
                  <li><strong>✓ Todo del Plan Básico</strong></li>
                  <li className="premium-feature">👑 Acceso para Acudientes</li>
                  <li className="premium-feature">👑 Contacto Directo con Docentes</li>
                  <li className="premium-feature">👑 Notificaciones Automáticas</li>
                  <li className="premium-feature">👑 Reportes PDF Avanzados</li>
                  <li className="premium-feature">👑 Alertas de Rendimiento</li>
                  <li className="premium-feature">👑 Historial y Tendencias</li>
                  <li className="premium-feature">👑 Soporte Prioritario</li>
                  <li className="premium-feature">👑 Múltiples Acudientes por Estudiante</li>
                  <li className="premium-feature">👑 Dashboard Administrativo Avanzado</li>
                </ul>
                <Link to="/registro" className="btn-plan btn-plan-premium">Activar Premium</Link>
              </div>
            </div>
          </div>
        </section>
        <section className="cta-section">
          <h2>¿Listo para Modernizar tu Institución?</h2>
          <p>Únete a la revolución educativa con Academix</p>
          <div className="hero-buttons">
            <Link to="/login" className="btn btn-primary btn-large">Iniciar Sesión</Link>
            <a href="#" className="btn btn-secondary btn-large">Solicitar Demo Gratis</a>
          </div>
        </section>
        <footer className="footer">
          <p>&copy; 2025 Academix - Sistema de Gestión de Notas | Desarrollado por Estudiantes CESDE</p>
          <p style={{ marginTop: '10px', color: '#718096' }}>Kevin, Nataly, Julián, Jeison, Karen, Miguel</p>
        </footer>
      </div>
    </div>
  )
}

export default Inicio
