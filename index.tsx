// @ts-nocheck
const { useState, useEffect, useRef, useMemo, useCallback } = React;

// --- DATOS DE PRODUCTOS ---
// Los productos se cargan desde productos.json para facilitar la edición del stock.
// Para modificar el inventario, edita el archivo productos.json
const productData = [
    // B&N - Disponibles 2026
    { id: 'mp2555', name: 'Ricoh MP 2555', priceUSD: 680, stock: 'disponible', quantity: 3, videoUrl: 'plFbhqrOF9s', image: 'images/8.jpg', type: 'B/N', speedPPM: 25, functions: ['Impresión', 'Escaneo a color', 'Copia'], paperSize: ['A3', 'A4'], status: 'Remanufacturado', benefits: ['Alimentador de documentos de alta velocidad', 'Seguridad empresarial mejorada', 'Operación silenciosa para ambientes de trabajo'] },
    { id: 'mp4055', name: 'Ricoh MP 4055', priceUSD: 1310, stock: 'disponible', quantity: 2, videoUrl: 't7X9a4yUW5A', image: 'images/9.jpg', type: 'B/N', speedPPM: 40, functions: ['Impresión', 'Escaneo a color', 'Copia'], paperSize: ['A3', 'A4'], status: 'Remanufacturado', benefits: ['Alto rendimiento para grupos de trabajo medianos', 'Opciones de acabado profesional disponibles', 'Eficiencia energética clase A'] },
    { id: 'mp5054', name: 'Ricoh MP 5054', priceUSD: 1350, stock: 'disponible', quantity: 2, videoUrl: 'iCvsiCR24N8', image: 'images/13.jpg', type: 'B/N', speedPPM: 50, functions: ['Impresión', 'Escaneo a color', 'Copia'], paperSize: ['A3', 'A4'], status: 'Remanufacturado', benefits: ['Rendimiento robusto para alto volumen', 'Calidad de impresión profesional 1200 dpi', 'Panel de control personalizable'] },
    { id: 'mp5055', name: 'Ricoh MP 5055', priceUSD: 1540, stock: 'disponible', quantity: 3, videoUrl: 'SBSFICiZDUA', image: 'images/13.jpg', type: 'B/N', speedPPM: 50, functions: ['Impresión', 'Escaneo a color', 'Copia'], paperSize: ['A3', 'A4'], status: 'Remanufacturado', benefits: ['Productividad superior para oficinas exigentes', 'Calidad de impresión profesional garantizada', 'Administración remota vía web'] },
    { id: 'mp6055', name: 'Ricoh MP 6055', priceUSD: 1690, stock: 'disponible', quantity: 2, videoUrl: 'T6Gj-hazaSU', image: 'images/14.jpg', type: 'B/N', speedPPM: 60, functions: ['Impresión', 'Escaneo a color', 'Copia'], paperSize: ['A3', 'A4'], status: 'Remanufacturado', benefits: ['Máxima productividad para departamentos grandes', 'Tecnología de imagen de última generación', 'Costo por página ultra competitivo'] },
    // B&N - Agotados
    { id: 'mp301', name: 'Ricoh MP 301', priceUSD: 450, stock: 'agotado', quantity: 0, videoUrl: 'AxODTHVNfBM', image: 'images/17.jpg', type: 'B/N', speedPPM: 30, functions: ['Impresión', 'Escaneo a color', 'Copia'], paperSize: ['A4'], status: 'Remanufacturado', benefits: ['Compacto y eficiente para espacios reducidos', 'Ideal para pequeñas oficinas y emprendimientos', 'Consumibles de bajo costo operativo'] },
    { id: 'im350', name: 'Ricoh IM 350', priceUSD: 475, stock: 'agotado', quantity: 0, videoUrl: 'EwXqXBcVQrM', image: 'images/10.jpg', type: 'B/N', speedPPM: 35, functions: ['Impresión', 'Escaneo a color', 'Copia'], paperSize: ['A4'], status: 'Remanufacturado', benefits: ['Pantalla táctil intuitiva de última generación', 'Conectividad WiFi y Ethernet avanzada', 'Modo eco con bajo consumo energético'] },
    { id: 'mp3055', name: 'Ricoh MP 3055', priceUSD: 1200, stock: 'agotado', quantity: 0, videoUrl: 't7X9a4yUW5A', image: 'images/11.jpg', type: 'B/N', speedPPM: 30, functions: ['Impresión', 'Escaneo a color', 'Copia'], paperSize: ['A3', 'A4'], status: 'Remanufacturado', benefits: ['Panel táctil a color personalizable', 'Integración nativa con la nube', 'Construcción robusta de alta durabilidad'] },
    { id: 'mp7503', name: 'Ricoh MP 7503', priceUSD: 2970, stock: 'agotado', quantity: 0, videoUrl: '05wFKCMdcKQ', image: 'images/16.jpg', type: 'B/N', speedPPM: 75, functions: ['Impresión', 'Escaneo a color', 'Copia'], paperSize: ['A3', 'A4'], status: 'Remanufacturado', benefits: ['Velocidad extrema para producción ligera', 'Capacidad de papel expandible hasta 8,000 hojas', 'Durabilidad de grado industrial'] },
    // Color - Disponible
    { id: 'mpc4504ex', name: 'Ricoh MP C4504ex', priceUSD: 1490, stock: 'disponible', quantity: 1, videoUrl: 'hoaq5mBaDV4', image: 'images/4.jpg', type: 'Color', speedPPM: 45, functions: ['Impresión', 'Escaneo a color', 'Copia'], paperSize: ['A3', 'A4'], status: 'Remanufacturado', benefits: ['Reproducción de colores vibrantes y precisos', 'Smart Operation Panel de alta resolución', 'Conectividad LAN, WiFi y móvil integrada'] },
    // Color - Disponibles
    { id: 'mpc6004ex', name: 'Ricoh MP C6004ex', priceUSD: 1790, stock: 'disponible', quantity: 1, videoUrl: '4eyeD3JW-98', image: 'images/6.jpg', type: 'Color', speedPPM: 60, functions: ['Impresión', 'Escaneo a color', 'Copia'], paperSize: ['A3', 'A4'], status: 'Remanufacturado', benefits: ['Velocidad de color líder en su clase', 'Calidad profesional para marketing y diseño', 'Modo suspensión con ahorro energético del 85%'] },
    // Color - Agotados
    { id: 'mpc5503', name: 'Ricoh MPC 5503', priceUSD: 1290, stock: 'agotado', quantity: 0, videoUrl: '4x8HN9GfEa4', image: 'images/2.jpg', type: 'Color', speedPPM: 55, functions: ['Impresión', 'Escaneo a color', 'Copia'], paperSize: ['A3', 'A4'], status: 'Remanufacturado', benefits: ['Calidad de color profesional superior', 'Panel táctil intuitivo tipo smartphone', 'Certificación de eficiencia energética'] }
];

const CoverSlide = () => (
    <div className="slide-content cover-slide">
        <div className="main-logo"><img src="images/logo ic.jpg" alt="International Copiers Logo" /></div>
        <span className="badge">Catálogo 2026</span>
        <h1>Copiadoras Multifuncionales Ricoh</h1>
        <h2>Soluciones de impresión profesional para potenciar tu negocio en Ecuador</h2>
        <div className="cta-hint">
            <span>Desliza para explorar</span>
            <span>→</span>
        </div>
    </div>
);

const CompanyIntroSlide = () => (
    <div className="slide-content content-slide">
        <h1>Bienvenido a International Copiers</h1>
        <p>Somos líderes en soluciones de impresión multifuncional en Ecuador. Con años de experiencia, nos especializamos en la venta y alquiler de equipos Ricoh remanufacturados, importados directamente desde Estados Unidos. Ofrecemos tecnología de punta a precios accesibles, garantizando la máxima eficiencia y productividad para tu negocio.</p>

        <h2><span className="icon">🎯</span> Nuestros Servicios</h2>
        <ul>
            <li>Venta de equipos Ricoh multifuncionales remanufacturados con garantía</li>
            <li>Asesoría personalizada para seleccionar el equipo ideal según tus necesidades</li>
            <li>Soporte técnico especializado, mantenimiento preventivo y correctivo</li>
            <li>Suministros y repuestos originales con entrega inmediata</li>
        </ul>

        <h2><span className="icon">📋</span> Servicio de Alquiler Todo Incluido</h2>
        <p>Entendemos que cada negocio es único. Por eso, ofrecemos planes de alquiler flexibles que incluyen: equipo, instalación, transporte, mantenimiento, repuestos, tóner y soporte técnico. ¡Todo en una sola cuota mensual sin sorpresas!</p>

        <h2><span className="icon">📍</span> Contáctenos</h2>
        <div className="contact-info">
            <p>
                <strong>Ubicación:</strong> Av. Teniente Hugo Ortiz, Quito, Ecuador<br />
                <strong>Teléfonos:</strong> +593 99 904 0958 / +593 99 985 5866<br />
                <strong>Especialidad:</strong> Venta y alquiler de equipos Ricoh multifuncionales
            </p>
        </div>
    </div>
);

const ProductSlide = ({ product, onImageClick }) => {
    const getStockBadge = () => {
        if (product.stock === 'agotado') {
            return <div className="stock-status-badge">AGOTADO</div>;
        }
        if (product.quantity <= 2) {
            return <div className="stock-status-badge limited">ÚLTIMAS UNIDADES</div>;
        }
        return <div className="stock-status-badge available">DISPONIBLE</div>;
    };

    return (
        <div className="slide-content product-slide">
            <h2>{product.name}</h2>
            <div className="product-details-grid">
                <div className="product-image-container" onClick={() => onImageClick(product.videoUrl)} title="Ver video demostrativo">
                    {getStockBadge()}
                    <img src={product.image} alt={`Imagen de ${product.name}`} className="product-actual-image" />
                    <div className="play-icon-overlay">▶</div>
                </div>
                <div className="product-info">
                    {product.stock === 'disponible' ? (
                        <>
                            <p className="price">${product.priceUSD.toLocaleString('en-US')} USD</p>
                            <p className="stock-count">
                                <span>✓</span> {product.quantity} {product.quantity === 1 ? 'unidad disponible' : 'unidades disponibles'}
                            </p>
                        </>
                    ) : (
                        <p className="out-of-stock-text">AGOTADO</p>
                    )}
                    <p><span className="icon">{product.type === 'Color' ? '🎨' : '📄'}</span> <strong>Tipo:</strong> {product.type}</p>
                    <p><span className="icon">⚡</span> <strong>Velocidad:</strong> {product.speedPPM} páginas por minuto</p>
                    <p><span className="icon">🔧</span> <strong>Estado:</strong> {product.status}</p>
                    <p><span className="icon">📏</span> <strong>Formato:</strong> {product.paperSize.join(' / ')}</p>
                    <div>
                        <p style={{ marginBottom: '8px' }}><span className="icon">⚙️</span> <strong>Funciones:</strong></p>
                        <ul>{product.functions.map(fn => <li key={fn}>{fn}</li>)}</ul>
                    </div>
                    <div className="product-benefits">
                        <h3><span className="icon">✅</span> Beneficios Destacados</h3>
                        <ul>{product.benefits.map(benefit => <li key={benefit}>{benefit}</li>)}</ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PriceSummarySlide = ({ products }) => {
    const sortedProducts = useMemo(() => {
        return [...products].sort((a, b) => {
            // Primero disponibles, luego agotados
            if (a.stock !== b.stock) {
                return a.stock === 'disponible' ? -1 : 1;
            }
            // Dentro de cada grupo, ordenar por precio
            return a.priceUSD - b.priceUSD;
        });
    }, [products]);

    return (
        <div className="slide-content content-slide price-summary-slide">
            <h1>Lista de Modelos y Precios 2026</h1>
            <table>
                <thead>
                    <tr>
                        <th>Modelo</th>
                        <th>Tipo</th>
                        <th>Velocidad</th>
                        <th>Estado</th>
                        <th>Disponibilidad</th>
                        <th>Precio (USD)</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedProducts.map(p => (
                        <tr key={p.id} className={p.stock === 'agotado' ? 'out-of-stock-row' : ''}>
                            <td><strong>{p.name}</strong></td>
                            <td>{p.type}</td>
                            <td>{p.speedPPM} ppm</td>
                            <td>{p.status}</td>
                            <td className="stock-status-cell">
                                {p.stock === 'disponible' ?
                                    <span className="available">{p.quantity} en stock</span> :
                                    <span className="out-of-stock">Agotado</span>}
                            </td>
                            <td className="price-col">
                                {p.stock === 'disponible' ? `$${p.priceUSD.toLocaleString('en-US')}` : '—'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const RentalCalculatorSlide = () => {
    const bnTiers = [
        { upTo: 5000, price: 0.040 },
        { upTo: 10000, price: 0.030 },
        { upTo: 99999, price: 0.025 }
    ];
    const colorTiers = [
        { upTo: 2000, price: 0.110 },
        { upTo: 5000, price: 0.090 },
        { upTo: 99999, price: 0.080 }
    ];
    const contractDiscounts = { 3: 1, 6: 0.98, 12: 0.95, 24: 0.92 };

    // Estados para Blanco y Negro
    const [bnVolume, setBnVolume] = useState(3000);
    const [bnDuration, setBnDuration] = useState(12);

    // Estados para Color
    const [colorVolume, setColorVolume] = useState(1500);
    const [colorDuration, setColorDuration] = useState(12);

    const bnCalculation = useMemo(() => {
        const tier = bnTiers.find(t => bnVolume <= t.upTo);
        const costPerCopy = tier.price;
        const discount = contractDiscounts[bnDuration];
        let subtotal = bnVolume * costPerCopy * discount;
        const iva = subtotal * 0.15;
        const total = subtotal + iva;
        return { subtotal, iva, total, costPerCopy };
    }, [bnVolume, bnDuration]);

    const colorCalculation = useMemo(() => {
        const tier = colorTiers.find(t => colorVolume <= t.upTo);
        const costPerCopy = tier.price;
        const discount = contractDiscounts[colorDuration];
        let subtotal = colorVolume * costPerCopy * discount;
        const iva = subtotal * 0.15;
        const total = subtotal + iva;
        return { subtotal, iva, total, costPerCopy };
    }, [colorVolume, colorDuration]);

    return (
        <div className="slide-content content-slide calculator-slide">
            <h1>Calculadora de Alquiler</h1>
            <p>Estime el costo mensual de su plan de alquiler. El valor es referencial y se ajustará a sus necesidades específicas. <strong>Incluye escáner doble óptico gratuito en todos los planes.</strong></p>

            <div className="calculator-dual-container">
                {/* Calculadora Blanco y Negro */}
                <div className="calculator-section bn-section">
                    <h2><span className="icon">📄</span> Blanco y Negro</h2>
                    <div className="calculator-controls">
                        <div className="calculator-control">
                            <label htmlFor="bnDuration">Duración del Contrato</label>
                            <select id="bnDuration" value={bnDuration} onChange={e => setBnDuration(Number(e.target.value))}>
                                <option value="3">3 Meses</option>
                                <option value="6">6 Meses (2% desc.)</option>
                                <option value="12">12 Meses (5% desc.)</option>
                                <option value="24">24 Meses (8% desc.)</option>
                            </select>
                        </div>
                        <div className="calculator-control">
                            <label htmlFor="bnVolume">Volumen: {Number(bnVolume).toLocaleString('es-EC')} copias/mes</label>
                            <input type="range" id="bnVolume" min="3000" max="20000" step="500" value={bnVolume} onChange={e => setBnVolume(Number(e.target.value))} />
                        </div>
                    </div>
                    <div className="calculator-result">
                        <div className="result-grid">
                            <div>Subtotal:</div>
                            <div>${bnCalculation.subtotal.toFixed(2)}</div>
                            <div>IVA (15%):</div>
                            <div>${bnCalculation.iva.toFixed(2)}</div>
                            <div className="total-label">Total:</div>
                            <div className="total-amount">${bnCalculation.total.toFixed(2)}</div>
                        </div>
                        <span className="detail">Costo por copia: ${bnCalculation.costPerCopy.toFixed(3)}</span>
                    </div>
                </div>

                {/* Calculadora Color */}
                <div className="calculator-section color-section">
                    <h2><span className="icon">🎨</span> Color</h2>
                    <div className="calculator-controls">
                        <div className="calculator-control">
                            <label htmlFor="colorDuration">Duración del Contrato</label>
                            <select id="colorDuration" value={colorDuration} onChange={e => setColorDuration(Number(e.target.value))}>
                                <option value="3">3 Meses</option>
                                <option value="6">6 Meses (2% desc.)</option>
                                <option value="12">12 Meses (5% desc.)</option>
                                <option value="24">24 Meses (8% desc.)</option>
                            </select>
                        </div>
                        <div className="calculator-control">
                            <label htmlFor="colorVolume">Volumen: {Number(colorVolume).toLocaleString('es-EC')} copias/mes</label>
                            <input type="range" id="colorVolume" min="1500" max="10000" step="500" value={colorVolume} onChange={e => setColorVolume(Number(e.target.value))} />
                        </div>
                    </div>
                    <div className="calculator-result">
                        <div className="result-grid">
                            <div>Subtotal:</div>
                            <div>${colorCalculation.subtotal.toFixed(2)}</div>
                            <div>IVA (15%):</div>
                            <div>${colorCalculation.iva.toFixed(2)}</div>
                            <div className="total-label">Total:</div>
                            <div className="total-amount">${colorCalculation.total.toFixed(2)}</div>
                        </div>
                        <span className="detail">Costo por copia: ${colorCalculation.costPerCopy.toFixed(3)}</span>
                    </div>
                </div>
            </div>

            <p className="calculator-note">💡 Incluye equipo, tóner, repuestos y soporte técnico en todos los planes.</p>
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
        const webhookUrl = 'https://hook.us2.make.com/cf22g6pvi83eov1ul73iv5wte4ueao8h';

        fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (response.ok) {
                    setStatus({ submitting: false, message: '¡Gracias! Hemos recibido su solicitud. Un asesor se pondrá en contacto con usted pronto.', type: 'success' });
                    setFormData({ name: '', phone: '', email: '', clientType: 'personal', companyName: '', model: '', comments: '' });
                } else { throw new Error('Network response was not ok.'); }
            })
            .catch(() => setStatus({ submitting: false, message: 'Error al enviar el formulario. Por favor, intente de nuevo o contáctenos directamente por WhatsApp.', type: 'error' }));
    };

    const availableProducts = useMemo(() => products.filter(p => p.stock === 'disponible'), [products]);

    return (
        <div className="slide-content content-slide form-slide">
            <h1>Solicitar Cotización</h1>
            <p>Complete el formulario y uno de nuestros asesores especializados se pondrá en contacto con usted a la brevedad posible.</p>
            <form onSubmit={handleSubmit}>
                <div className="grid">
                    <div className="form-group">
                        <label htmlFor="name">Nombre y Apellido *</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Ej: Juan Pérez" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Número de Teléfono *</label>
                        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Ej: 0999999999" />
                    </div>
                    <div className="form-group full-width">
                        <label htmlFor="email">Correo Electrónico *</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Ej: correo@empresa.com" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="clientType">Tipo de Cliente</label>
                        <select id="clientType" name="clientType" value={formData.clientType} onChange={handleChange}>
                            <option value="personal">Personal / Emprendimiento</option>
                            <option value="empresa">Empresa / Institución</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="companyName">Nombre de la Empresa (si aplica)</label>
                        <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} disabled={formData.clientType === 'personal'} placeholder="Nombre de su empresa" />
                    </div>
                    <div className="form-group full-width">
                        <label htmlFor="model">Modelo de Interés</label>
                        <select id="model" name="model" value={formData.model} onChange={handleChange}>
                            <option value="">Cualquiera / Necesito asesoría</option>
                            {availableProducts.map(p => <option key={p.id} value={p.name}>{p.name} — ${p.priceUSD.toLocaleString('en-US')}</option>)}
                        </select>
                    </div>
                    <div className="form-group full-width">
                        <label htmlFor="comments">Comentarios Adicionales</label>
                        <textarea id="comments" name="comments" value={formData.comments} onChange={handleChange} placeholder="Describa sus necesidades, volumen de impresión estimado, etc."></textarea>
                    </div>
                    <div className="form-group full-width">
                        <button type="submit" className="form-button" disabled={status.submitting}>
                            {status.submitting ? '⏳ Enviando...' : '📧 Enviar Solicitud'}
                        </button>
                    </div>
                </div>
                {status.message && <div className={`form-message ${status.type}`}>{status.message}</div>}
            </form>
        </div>
    );
};

const WarrantySlide = () => (
    <div className="slide-content content-slide warranty-slide">
        <h1>Nuestra Garantía de Calidad</h1>
        <div className="warranty-card">
            <div className="warranty-icon">🛡️</div>
            <p><strong>Para Equipos Adquiridos (Venta):</strong> Todos nuestros equipos remanufacturados cuentan con una garantía de <strong>6 meses o 10,000 copias</strong> (lo que se cumpla primero). Respaldamos cada equipo con nuestro compromiso de calidad.</p>
            <br />
            <p><strong>Para Servicio de Alquiler:</strong> La garantía, mantenimiento preventivo, repuestos y suministros están <strong>completamente cubiertos</strong> durante toda la vigencia de su contrato. ¡Sin costos ocultos!</p>
            <br />
            <p style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--primary-600)', marginTop: '24px' }}>
                ¡Su inversión y operatividad están protegidas con International Copiers!
            </p>
        </div>
    </div>
);

const VideoModal = ({ videoUrl, onClose }) => {
    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Escape') onClose();
    }, [onClose]);

    useEffect(() => {
        if (videoUrl) {
            document.addEventListener('keydown', handleKeyDown);
            return () => document.removeEventListener('keydown', handleKeyDown);
        }
    }, [videoUrl, handleKeyDown]);

    if (!videoUrl) return null;

    return (
        <div className="video-modal" onClick={onClose}>
            <div className="video-modal-content" onClick={e => e.stopPropagation()}>
                <button className="video-modal-close" onClick={onClose} aria-label="Cerrar video">&times;</button>
                <div className="video-wrapper">
                    <iframe
                        src={`https://www.youtube.com/embed/${videoUrl}?autoplay=1&rel=0`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Video del producto"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

const WhatsappFAB = () => (
    <a
        href="https://wa.link/rh0qwy"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-fab"
        title="Cotiza ya por WhatsApp"
        data-tooltip="¡Cotiza ahora!"
        aria-label="Contactar por WhatsApp"
    >
        <svg viewBox="0 0 24 24" width="32" height="32" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
    </a>
);

const App = () => {
    // Ordenar productos: disponibles primero, luego por tipo, luego por nombre
    const sortedProductData = useMemo(() => [...productData].sort((a, b) => {
        // Disponibles primero
        if (a.stock !== b.stock) {
            return a.stock === 'disponible' ? -1 : 1;
        }
        // Luego por tipo
        if (a.type < b.type) return -1;
        if (a.type > b.type) return 1;
        // Luego por nombre
        return a.name.localeCompare(b.name);
    }), []);

    const [videoModalUrl, setVideoModalUrl] = useState(null);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const slideContainerRef = useRef(null);

    const slides = useMemo(() => [
        <CoverSlide key="cover" />,
        <CompanyIntroSlide key="intro" />,
        ...sortedProductData.map(p => <ProductSlide product={p} key={p.id} onImageClick={setVideoModalUrl} />),
        <PriceSummarySlide products={productData} key="price-summary" />,
        <RentalCalculatorSlide key="calculator" />,
        <QuoteFormSlide products={productData} key="quote-form" />,
        <WarrantySlide key="warranty" />
    ], [sortedProductData]);

    const nextSlide = useCallback(() => {
        setCurrentSlideIndex(prev => Math.min(prev + 1, slides.length - 1));
    }, [slides.length]);

    const prevSlide = useCallback(() => {
        setCurrentSlideIndex(prev => Math.max(prev - 1, 0));
    }, []);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [nextSlide, prevSlide]);

    // Scroll to top on slide change
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
                <button onClick={prevSlide} disabled={currentSlideIndex === 0} className="nav-button" aria-label="Diapositiva anterior">
                    ← Anterior
                </button>
                <div className="slide-indicator">{currentSlideIndex + 1} / {slides.length}</div>
                <button onClick={nextSlide} disabled={currentSlideIndex === slides.length - 1} className="nav-button" aria-label="Siguiente diapositiva">
                    Siguiente →
                </button>
            </div>

            <WhatsappFAB />
            <VideoModal videoUrl={videoModalUrl} onClose={() => setVideoModalUrl(null)} />
        </>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
