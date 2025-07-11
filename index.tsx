
// @ts-nocheck
const { useState, useEffect, useRef, useMemo } = React;

// --- DATOS DE PRODUCTOS (Backend manual) ---
// Para gestionar el stock, cambia 'stock' a 'disponible' o 'agotado'.
// Para los videos, sube el video a YouTube y pega su ID en 'videoUrl'.
const productData = [
  // B&N
  { id: 'mp301', name: 'Ricoh MP 301', priceUSD: 450, stock: 'agotado', videoUrl: 'AxODTHVNfBM', image: 'images/17.jpg', type: 'B/N', speedPPM: 30, functions: ['Impresión', 'Escaneo', 'Copia'], paperSize: ['A4'], status: 'Nuevo', benefits: ['Compacto y eficiente', 'Ideal para pequeñas oficinas', 'Tóner económico'] },
  { id: 'im350', name: 'Ricoh IM 350', priceUSD: 475, stock: 'disponible', videoUrl: 'EwXqXBcVQrM', image: 'images/10.jpg', type: 'B/N', speedPPM: 35, functions: ['Impresión', 'Escaneo', 'Copia', 'Fax (opcional)'], paperSize: ['A4'], status: 'Nuevo', benefits: ['Pantalla táctil intuitiva', 'Conectividad avanzada', 'Bajo consumo energético'] },
  { id: 'mp2555', name: 'Ricoh MP 2555', priceUSD: 980, stock: 'disponible', videoUrl: 'plFbhqrOF9s', image: 'images/8.jpg', type: 'B/N', speedPPM: 25, functions: ['Impresión', 'Escaneo', 'Copia'], paperSize: ['A3', 'A4'], status: 'Nuevo', benefits: ['Alimentador de documentos rápido', 'Funciones de seguridad mejoradas', 'Operación silenciosa'] },
  { id: 'mp3055', name: 'Ricoh MP 3055', priceUSD: 1200, stock: 'agotado', videoUrl: 't7X9a4yUW5A', image: 'images/11.jpg', type: 'B/N', speedPPM: 30, functions: ['Impresión', 'Escaneo', 'Copia', 'Fax'], paperSize: ['A3', 'A4'], status: 'Nuevo', benefits: ['Pantalla táctil a color personalizable', 'Integración con la nube', 'Alta durabilidad'] },
  { id: 'mp4055', name: 'Ricoh MP 4055', priceUSD: 1410, stock: 'disponible', videoUrl: 't7X9a4yUW5A', image: 'images/9.jpg', type: 'B/N', speedPPM: 40, functions: ['Impresión', 'Escaneo', 'Copia', 'Fax'], paperSize: ['A3', 'A4'], status: 'Nuevo', benefits: ['Alta velocidad para grupos de trabajo', 'Opciones de finalizado avanzadas', 'Eficiencia energética superior'] },
  { id: 'mp5054', name: 'Ricoh MP 5054', priceUSD: 1310, stock: 'disponible', videoUrl: 'iCvsiCR24N8', image: 'images/13.jpg', type: 'B/N', speedPPM: 50, functions: ['Impresión', 'Escaneo', 'Copia', 'Fax'], paperSize: ['A3', 'A4'], status: 'Nuevo', benefits: ['Rendimiento robusto', 'Calidad de impresión profesional', 'Panel de operación personalizable'] },
  { id: 'mp5055', name: 'Ricoh MP 5055', priceUSD: 1640, stock: 'disponible', videoUrl: 'SBSFICiZDUA', image: 'images/13.jpg', type: 'B/N', speedPPM: 50, functions: ['Impresión', 'Escaneo', 'Copia', 'Fax'], paperSize: ['A3', 'A4'], status: 'Nuevo', benefits: ['Rendimiento robusto para alto volumen', 'Calidad de impresión profesional', 'Fácil administración remota'] },
  { id: 'mp6055', name: 'Ricoh MP 6055', priceUSD: 1895, stock: 'agotado', videoUrl: 'T6Gj-hazaSU', image: 'images/14.jpg', type: 'B/N', speedPPM: 60, functions: ['Impresión', 'Escaneo', 'Copia', 'Fax (opcional)'], paperSize: ['A3', 'A4'], status: 'Nuevo', benefits: ['Máxima productividad para grandes departamentos', 'Tecnología de imagen avanzada', 'Bajo costo por página'] },
  { id: 'mp7503', name: 'Ricoh MP 7503', priceUSD: 2970, stock: 'disponible', videoUrl: '05wFKCMdcKQ', image: 'images/16.jpg', type: 'B/N', speedPPM: 75, functions: ['Impresión', 'Escaneo', 'Copia'], paperSize: ['A3', 'A4'], status: 'Nuevo', benefits: ['Velocidad extrema para entornos de producción ligera', 'Capacidad de papel expandible', 'Durabilidad industrial'] },
  // Color
  { id: 'mpc4504ex', name: 'Ricoh MP C4504ex', priceUSD: 1490, stock: 'disponible', videoUrl: 'hoaq5mBaDV4', image: 'images/4.jpg', type: 'Color', speedPPM: 45, functions: ['Impresión', 'Escaneo', 'Copia', 'Fax'], paperSize: ['A3', 'A4'], status: 'Nuevo', benefits: ['Colores vibrantes y precisos', 'Smart Operation Panel', 'Conectividad LAN y móvil'] },
  { id: 'mpc5503', name: 'Ricoh MPC 5503', priceUSD: 1290, stock: 'disponible', videoUrl: '4x8HN9GfEa4', image: 'images/2.jpg', type: 'Color', speedPPM: 55, functions: ['Impresión', 'Escaneo', 'Copia', 'Fax (opcional)'], paperSize: ['A3', 'A4'], status: 'Nuevo', benefits: ['Calidad de color superior', 'Panel táctil intuitivo', 'Eficiencia energética'] },
  { id: 'mpc6004ex', name: 'Ricoh MP C6004ex', priceUSD: 1890, stock: 'disponible', videoUrl: '4eyeD3JW-98', image: 'images/6.jpg', type: 'Color', speedPPM: 60, functions: ['Impresión', 'Escaneo', 'Copia', 'Fax'], paperSize: ['A3', 'A4'], status: 'Nuevo', benefits: ['Alta velocidad a color', 'Calidad profesional de marketing', 'Ahorro energético modo suspensión'] }
];

const CoverSlide = () => (
    <div className="slide-content cover-slide">
        <div className="main-logo"><img src="images/logo ic.jpg" alt="International Copiers Logo" /></div>
        <h1>Catálogo de Copiadoras Ricoh</h1>
        <h2>Calidad y eficiencia para tu negocio</h2>
    </div>
);

const CompanyIntroSlide = () => (
    <div className="slide-content content-slide">
        <h1>Bienvenido a International Copiers</h1>
        <p>En International Copiers, nos dedicamos a proveer soluciones de impresión de alta calidad que impulsan la eficiencia y productividad de su negocio. Con años de experiencia en el mercado ecuatoriano, somos especialistas en la venta de equipos multifuncionales Ricoh, tanto a blanco y negro como a color. Somos importadores directos desde Estados Unidos, garantizando equipos de vanguardia.</p>
        <h2>Nuestros Servicios</h2>
        <ul>
            <li>Venta de equipos Ricoh multifuncionales (todos nuestros equipos son nuevos).</li>
            <li>Asesoría personalizada para elegir el equipo que mejor se adapte a sus necesidades.</li>
            <li>Soporte técnico, mantenimiento y venta de consumibles y repuestos originales.</li>
        </ul>
        <h2>Servicio de Alquiler Personalizado</h2>
        <p>Entendemos que cada negocio tiene necesidades únicas. Por ello, ofrecemos un flexible servicio de alquiler de equipos multifuncionales que incluye instalación, transporte, mantenimiento, repuestos, suministros y soporte técnico. Contáctenos para diseñar un plan de alquiler a su medida.</p>
        <h2>Contáctenos</h2>
        <p className="contact-info">
            <strong>Ubicación:</strong> Av. Teniente Hugo Ortiz, Quito, Ecuador<br />
            <strong>Teléfonos:</strong> +593 99 904 0958 / +593 99 985 5866<br />
            <strong>Especialidad:</strong> Venta y alquiler de equipos Ricoh multifuncionales.
        </p>
    </div>
);

const ProductSlide = ({ product, onImageClick }) => (
    <div className="slide-content product-slide">
        <h2>{product.name}</h2>
        <div className="product-details-grid">
            <div className="product-image-container" onClick={() => onImageClick(product.videoUrl)} title="Ver video">
                {product.stock === 'agotado' && <div className="stock-status-badge">AGOTADO</div>}
                <img src={product.image} alt={`Imagen de ${product.name}`} className="product-actual-image" />
                <div className="play-icon-overlay">▶</div>
            </div>
            <div className="product-info">
                {product.stock === 'disponible' ? 
                    <p className="price">Precio: ${product.priceUSD.toLocaleString('en-US')}</p> :
                    <p className="out-of-stock-text">AGOTADO</p>
                }
                <p><strong><span className="icon">{product.type === 'Color' ? '🎨' : '📄'}</span> Tipo:</strong> {product.type}</p>
                <p><strong><span className="icon">⚡️</span> Velocidad:</strong> {product.speedPPM} ppm</p>
                <p><strong><span className="icon">🔩</span> Estado:</strong> {product.status}</p>
                <p><strong><span className="icon">📏</span> Tamaño de Papel:</strong> {product.paperSize.join(' / ')}</p>
                <div>
                    <strong><span className="icon">⚙️</span> Funciones:</strong>
                    <ul>{product.functions.map(fn => <li key={fn}>{fn}</li>)}</ul>
                </div>
                 <div className="product-benefits">
                    <h3><span className="icon">✅</span> Beneficios Destacados:</h3>
                    <ul>{product.benefits.map(benefit => <li key={benefit}>{benefit}</li>)}</ul>
                </div>
            </div>
        </div>
    </div>
);

const PriceSummarySlide = ({ products }) => (
    <div className="slide-content content-slide price-summary-slide">
        <h1>Lista de Modelos y Precios</h1>
        <table>
            <thead><tr><th>Modelo</th><th>Tipo</th><th>Velocidad</th><th>Estado</th><th>Stock</th><th>Precio (USD)</th></tr></thead>
            <tbody>
                {products.sort((a, b) => a.priceUSD - b.priceUSD).map(p => ( 
                    <tr key={p.id} className={p.stock === 'agotado' ? 'out-of-stock-row' : ''}>
                        <td>{p.name}</td>
                        <td>{p.type}</td>
                        <td>{p.speedPPM} ppm</td>
                        <td>{p.status}</td>
                        <td className="stock-status-cell">
                            {p.stock === 'disponible' ? 
                                <span className="available">Disponible</span> : 
                                <span className="out-of-stock">Agotado</span>}
                        </td>
                        <td className="price-col">{p.stock === 'disponible' ? `$${p.priceUSD.toLocaleString('en-US')}` : '-'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const RentalCalculatorSlide = () => {
    // Definición de precios por niveles
    const bnTiers = [
        { upTo: 1000, price: 0.050, minCharge: 50 }, // Mínimo 1000 copias a $0.05 = $50
        { upTo: 5000, price: 0.040 },
        { upTo: 10000, price: 0.030 },
        { upTo: 99999, price: 0.025 }
    ];
    const colorTiers = [
        { upTo: 500, price: 0.130, minCharge: 65 }, // Mínimo 500 copias a $0.13 = $65
        { upTo: 2000, price: 0.110 },
        { upTo: 5000, price: 0.090 },
        { upTo: 99999, price: 0.080 }
    ];
    const contractDiscounts = { 3: 1, 6: 0.98, 12: 0.95, 24: 0.92 }; // % de descuento por duración

    const [printType, setPrintType] = useState('bn');
    const [volume, setVolume] = useState(3000);
    const [duration, setDuration] = useState(12);

    // useMemo para optimizar el cálculo
    const calculation = useMemo(() => {
        const tiers = printType === 'bn' ? bnTiers : colorTiers;
        const tier = tiers.find(t => volume <= t.upTo);
        const costPerCopy = tier.price;
        const discount = contractDiscounts[duration];

        let subtotal = volume * costPerCopy;

        // Aplicar cargo mínimo si corresponde
        if (tier.minCharge && subtotal < tier.minCharge) {
            subtotal = tier.minCharge;
        }
        
        // Aplicar descuento por contrato largo
        subtotal *= discount;

        const iva = subtotal * 0.15; // IVA del 15%
        const total = subtotal + iva;

        return { subtotal, iva, total, costPerCopy };
    }, [printType, volume, duration]);

    return (
        <div className="slide-content content-slide calculator-slide">
            <h1>Calculadora de Alquiler</h1>
            <p>Estime el costo mensual de su plan. El valor es referencial y se ajustará a sus necesidades. <strong>Escáner doble óptico gratuito en todos los planes.</strong></p>
            <div className="grid">
                <div className="calculator-control">
                    <label htmlFor="printType">Tipo de Impresión</label>
                    <select id="printType" value={printType} onChange={e => setPrintType(e.target.value)}>
                        <option value="bn">Blanco y Negro</option>
                        <option value="color">Color</option>
                    </select>
                </div>
                <div className="calculator-control">
                    <label htmlFor="duration">Duración del Contrato</label>
                    <select id="duration" value={duration} onChange={e => setDuration(Number(e.target.value))}>
                        <option value="3">3 Meses</option>
                        <option value="6">6 Meses (2% desc.)</option>
                        <option value="12">12 Meses (5% desc.)</option>
                        <option value="24">24 Meses (8% desc.)</option>
                    </select>
                </div>
                <div className="calculator-control full-width">
                    <label htmlFor="volume">Volumen Mensual de Copias/Impresiones: {Number(volume).toLocaleString('es-EC')}</label>
                    <input type="range" id="volume" min="500" max="20000" step="500" value={volume} onChange={e => setVolume(Number(e.target.value))} />
                </div>
            </div>
            <div className="calculator-result">
                <h3>Resumen de Costo Mensual Estimado</h3>
                <div className="result-grid">
                    <div>Subtotal:</div>
                    <div>${calculation.subtotal.toFixed(2)}</div>
                    <div>IVA (15%):</div>
                    <div>${calculation.iva.toFixed(2)}</div>
                    <div className="total-label">Total a Facturar:</div>
                    <div className="total-amount">${calculation.total.toFixed(2)}</div>
                </div>
                <span className="detail">Costo por copia estimado: ${calculation.costPerCopy.toFixed(3)}. Incluye equipo, tóner, repuestos y soporte.</span>
            </div>
        </div>
    );
};

const QuoteFormSlide = ({ products }) => {
    const [formData, setFormData] = useState({ name: '', phone: '', email: '', clientType: 'personal', companyName: '', model: '', comments: '' });
    const [status, setStatus] = useState({ submitting: false, message: '', type: '' });

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        setStatus({ submitting: true, message: '', type: '' });
        // REEMPLAZA ESTA URL con tu webhook de Make.com
        const webhookUrl = 'https://hook.us2.make.com/cf22g6pvi83eov1ul73iv5wte4ueao8h';

        fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (response.ok) {
                setStatus({ submitting: false, message: '¡Gracias! Hemos recibido su solicitud. Le contactaremos pronto.', type: 'success' });
                setFormData({ name: '', phone: '', email: '', clientType: 'personal', companyName: '', model: '', comments: '' });
            } else { throw new Error('Network response was not ok.'); }
        })
        .catch(() => setStatus({ submitting: false, message: 'Error al enviar el formulario. Por favor, intente de nuevo o contáctenos por WhatsApp.', type: 'error' }));
    };

    return (
        <div className="slide-content content-slide form-slide">
            <h1>Solicitar Cotización</h1>
            <p>Complete el formulario y uno de nuestros asesores se pondrá en contacto con usted a la brevedad posible.</p>
            <form onSubmit={handleSubmit}>
                <div className="grid">
                    <div className="form-group"><label htmlFor="name">Nombre y Apellido</label><input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required /></div>
                    <div className="form-group"><label htmlFor="phone">Número de Teléfono</label><input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required /></div>
                    <div className="form-group full-width"><label htmlFor="email">Correo Electrónico</label><input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required /></div>
                    <div className="form-group"><label htmlFor="clientType">Tipo de Cliente</label><select id="clientType" name="clientType" value={formData.clientType} onChange={handleChange}><option value="personal">Personal</option><option value="empresa">Empresa / Institución</option></select></div>
                    <div className="form-group"><label htmlFor="companyName">Nombre de la Empresa (si aplica)</label><input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} disabled={formData.clientType === 'personal'} /></div>
                    <div className="form-group full-width"><label htmlFor="model">Modelo de Interés</label><select id="model" name="model" value={formData.model} onChange={handleChange}><option value="">Cualquiera / Necesito asesoría</option>{products.filter(p => p.stock === 'disponible').map(p => <option key={p.id} value={p.name}>{p.name}</option>)}</select></div>
                    <div className="form-group full-width"><label htmlFor="comments">Comentarios Adicionales</label><textarea id="comments" name="comments" value={formData.comments} onChange={handleChange}></textarea></div>
                    <div className="form-group full-width"><button type="submit" className="form-button" disabled={status.submitting}>{status.submitting ? 'Enviando...' : 'Enviar Solicitud'}</button></div>
                </div>
                {status.message && <div className={`form-message ${status.type}`}>{status.message}</div>}
            </form>
        </div>
    );
};

const WarrantySlide = () => (
    <div className="slide-content content-slide warranty-slide" style={{textAlign: "center", paddingTop: "80px"}}>
         <h1>Nuestra Garantía 🛡️</h1>
        <p><strong>Para Equipos Adquiridos (Venta):</strong> Todos nuestros equipos nuevos cuentan con una garantía de <strong>6 meses o 10,000 copias</strong> (lo que se cumpla primero).</p>
        <p><strong>Para Servicio de Alquiler:</strong> La garantía, mantenimiento y suministros están completamente cubiertos durante toda la vigencia de su contrato.</p>
        <p style={{fontSize: "1.2em", marginTop: "30px", fontWeight: "bold"}}>¡Su inversión y operatividad están protegidas con International Copiers!</p>
    </div>
);

const VideoModal = ({ videoUrl, onClose }) => {
    if (!videoUrl) return null;
    return (
        <div className="video-modal" onClick={onClose}>
            <div className="video-modal-content" onClick={e => e.stopPropagation()}>
                <button className="video-modal-close" onClick={onClose}>&times;</button>
                <div className="video-wrapper">
                    <iframe src={`https://www.youtube.com/embed/${videoUrl}?autoplay=1&rel=0`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
            </div>
        </div>
    );
};

const WhatsappFAB = () => (
    <a 
        href="https://wa.link/rh0qwy" /* <-- TU ENLACE YA ESTÁ AQUÍ */
        target="_blank" 
        rel="noopener noreferrer" 
        className="whatsapp-fab" 
        title="Cotiza ya por WhatsApp"
        data-tooltip="Cotiza ya"
    >
        <span className="icon">
            <img src="images/whatsapplogo.png" alt="Contactar por WhatsApp" />
        </span>
    </a>
);


const App = () => {
    const sortedProductData = useMemo(() => [...productData].sort((a, b) => {
        if (a.type < b.type) return -1;
        if (a.type > b.type) return 1;
        return a.name.localeCompare(b.name);
    }), []);
    
    const [videoModalUrl, setVideoModalUrl] = useState(null);

    const slides = useMemo(() => [
        <CoverSlide key="cover" />,
        <CompanyIntroSlide key="intro" />,
        ...sortedProductData.map(p => <ProductSlide product={p} key={p.id} onImageClick={setVideoModalUrl} />),
        <PriceSummarySlide products={productData} key="price-summary" />,
        <RentalCalculatorSlide key="calculator" />,
        <QuoteFormSlide products={productData} key="quote-form" />,
        <WarrantySlide key="warranty" />
    ], [sortedProductData]);

    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const slideContainerRef = useRef(null);

    const nextSlide = () => setCurrentSlideIndex(prev => Math.min(prev + 1, slides.length - 1));
    const prevSlide = () => setCurrentSlideIndex(prev => Math.max(prev - 1, 0));
    
    useEffect(() => {
        if (slideContainerRef.current) {
            slideContainerRef.current.scrollTop = 0;
        }
    }, [currentSlideIndex]);

    return (
        <>
            {currentSlideIndex > 0 && (
                <div className="logo"><img src="images/logo ic.jpg" alt="International Copiers Logo" /></div>
            )}
            <div className="slide-container" ref={slideContainerRef}>
                {slides[currentSlideIndex]}
            </div>

            <div className="navigation-controls">
                <button onClick={prevSlide} disabled={currentSlideIndex === 0} className="nav-button" aria-label="Anterior">Anterior</button>
                <div className="slide-indicator">{currentSlideIndex + 1} / {slides.length}</div>
                <button onClick={nextSlide} disabled={currentSlideIndex === slides.length - 1} className="nav-button" aria-label="Siguiente">Siguiente</button>
            </div>
            
            <WhatsappFAB />
            <VideoModal videoUrl={videoModalUrl} onClose={() => setVideoModalUrl(null)} />
        </>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
