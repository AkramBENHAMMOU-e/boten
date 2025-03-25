import React, { useState, useEffect, memo, useRef } from 'react';
import "./App.css";

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FaFacebook, FaInstagram, FaWhatsapp, FaTimes, FaBars, FaChevronDown,FaCompass,FaEnvelope,FaFileContract,FaBalanceScale,FaChevronRight, FaHashtag,FaPaintBrush } from "react-icons/fa";
import { 
  Car, Sun, Moon, Clock, Settings, Star, Phone, Mail, MapPin, CheckCircle,
  ChevronLeft, ChevronRight, User, Quote, ThumbsUp, Sparkles,ChevronDown, CreditCard,
  PhoneCall, Shield, Repeat, Bolt, Fuel, Bold,MessageCircle, Check, ArrowRight, MessageSquare, PlusCircle
} from 'lucide-react';
import Swal from 'sweetalert2';
import Logo from './assets/bten (1).png';
import DaciaLogo from './assets/daciaLogo.png';
import Dacia from './assets/dacia-removebg-preview.png';
import VolswagenLogo from './assets/volswagenLogo-removebg-preview.png';
import Touarg from './assets/touarg-removebg-preview.png';
import RenaultLogo from './assets/renaultLogo-removebg-preview.png'; 
import Clio from './assets/clio-removebg-preview.png';  
import TeslaLogo from './assets/teslaLogo-removebg-preview.png';
import Tesla from './assets/tesla.jpeg';
import { useData } from './context/DataContext';
import FordLogo from './assets/ford-logo-removebg-preview.png';
import KiaLogo from './assets/kiaLogo.png';
import FiatLogo from './assets/fiatLogo.png';
import PeugeotLogo from './assets/peugeotLogo.png';
import MercedesLogo from './assets/mercedesLogo.png';
import Mercedes from './assets/mercedesCLC.png'
import CitroenLogo from './assets/citroenLogo.png';
import AudiLogo from './assets/audiLogo.png';
import OpelLogo from './assets/opelLogo.png';
import SkodaLogo from './assets/skodaLogo.png';
import SeatLogo from './assets/seatLogo.png';
import SuzukiLogo from './assets/suzukiLogo.png';
import ToyotaLogo from './assets/toyotaLogo.png';
import NissanLogo from './assets/nissanLogo.png';
import HondaLogo from './assets/hondaLogo.png';
import MitsubishiLogo from './assets/mitsubichiLogo.png';
import ChevroletLogo from './assets/chevroletLogo.png';
import BmwLogo from './assets/bmwLogo.png';
import DfskLogo from './assets/dfskLogo.png';
import HyundaiLogo from './assets/hyundaiLogo.png'
import { useNavigate } from 'react-router-dom';

// Utility function to format ISO date to MySQL-compatible format
const formatDateForMySQL = (isoDate) => {
    const date = new Date(isoDate);
    return date.toISOString().slice(0, 19).replace('T', ' ');
};

// Default cars array
const cars = [
    {
        id: 1,
        name: "Dacia Duster Full Option",
        brand: "dacia",
        price: 800,
        type: "SUV",
        fuel: "Diesel",
        power: "130 ch",
        acceleration: "10.6s",
        consumption: "4.8L/100km",
        transmission: "Automatique",
        category: "Économique",
        description: "Un SUV robuste et économique",
        images: [DaciaLogo, DaciaLogo, DaciaLogo]
    },
    {
        id: 2,
        name: "Mercedes Classe G Full Option",
        brand: "mercedes",
        price: 600,
        type: "Citadine",
        fuel: "Essence",
        power: "100 ch",
        acceleration: "11.8s",
        consumption: "5.0L/100km",
        transmission: "Automatique",
        category: "Économique",
        description: "Une citadine agile et moderne",
        images: [MercedesLogo, MercedesLogo, MercedesLogo]
    },
    {
        id: 3,
        name: "Volkswagen Touareg R Full Option",
        brand: "volkswagen",
        price: 950,
        type: "SUV",
        fuel: "Essence",
        power: "510 ch",
        acceleration: "3.4s",
        consumption: "12.3L/100km",
        transmission: "Automatique",
        category: "Luxe",
        description: "Un SUV de luxe puissant",
        images: [VolswagenLogo, VolswagenLogo, VolswagenLogo]
    },
];

const Main = () => {
    const { cars: fleetCarsFromContext, settings, addCustomer, addReservation } = useData();
    const [darkMode, setDarkMode] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const navigate = useNavigate();

    const handleLogoClick = () => {
        setClickCount(prev => {
            if (prev + 1 >= 5) {
                navigate('/admin');
                return 0;
            }
            return prev + 1;
        });
    };

    const handleWhatsAppReservation = async (carName, carId, addCustomer, addReservation) => {
        try {
            // Obtention des dates
            const today = new Date().toISOString().split('T')[0];
            const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];

            // Configuration du formulaire avec SweetAlert2
            const { value: formValues } = await Swal.fire({
                title: 'Réservez votre voiture',
                html: `
                        <style>
                            .form-container {
                                width: 100%;
                                margin: 0 auto;
                                padding: 0;
                            }
                            .form-group {
                                margin-bottom: 16px;
                            }
                            .swal2-input, .swal2-select {
                                height: 40px;
                                width: 100% !important;
                                margin: 0 !important;
                                padding: 8px 12px !important;
                                font-size: 15px !important;
                                border-radius: 8px !important;
                                border: 1px solid #ddd !important;
                                box-shadow: none !important;
                                box-sizing: border-box !important;
                            }
                            .input-label {
                                display: block;
                                margin-bottom: 5px;
                                font-size: 14px;
                                font-weight: 500;
                                color: #555;
                            }
                            @media (min-width: 768px) {
                                .form-container {
                                    max-width: 450px;
                                    padding: 0 10px;
                                }
                                .swal2-popup {
                                    width: auto !important;
                                    min-width: 500px !important;
                                    padding: 1.5em !important;
                                }
                                .swal2-title {
                                    font-size: 24px !important;
                                }
                                .swal2-input, .swal2-select {
                                    font-size: 16px !important;
                                }
                                .input-label {
                                    font-size: 15px;
                                }
                            }
                            @media (max-width: 767px) {
                                .form-container {
                                    max-width: 100%;
                                    padding: 0 5px;
                                }
                                .swal2-popup {
                                    padding: 0.8em !important;
                                    width: 90% !important;
                                    max-width: 350px !important;
                                }
                                .swal2-title {
                                    font-size: 18px !important;
                                    padding: 10px 0 !important;
                                }
                                .swal2-actions {
                                    margin-top: 10px !important;
                                }
                            }
                        </style>
                        <div class="form-container">
                            <div class="form-group">
                                <input id="swal-input1" class="swal2-input" placeholder="Votre nom" required>
                            </div>
                            <div class="form-group">
                                <input id="swal-input2" class="swal2-input" type="tel" placeholder="Votre téléphone" required>
                            </div>
                            <div class="form-group">
                                <label class="input-label" for="start-date">Date de début:</label>
                                <input id="start-date" type="date" class="swal2-input" value="${today}" min="${today}" required>
                            </div>
                            <div class="form-group">
                                <label class="input-label" for="end-date">Date de fin:</label>
                                <input id="end-date" type="date" class="swal2-input" value="${tomorrow}" min="${tomorrow}" required>
                            </div>
                        </div>
                    `,
                focusConfirm: false,
                customClass: {
                    container: 'custom-swal-container',
                    popup: 'custom-swal-popup',
                    title: 'custom-swal-title',
                    confirmButton: 'custom-swal-confirm',
                    cancelButton: 'custom-swal-cancel'
                },
                preConfirm: () => {
                    const customerName = document.getElementById('swal-input1').value;
                    const customerPhone = document.getElementById('swal-input2').value;
                    const startDate = document.getElementById('start-date').value;
                    const endDate = document.getElementById('end-date').value;

                    if (!customerName || !customerPhone) {
                        Swal.showValidationMessage('Veuillez remplir tous les champs');
                        return false;
                    }
                    if (!startDate || !endDate) {
                        Swal.showValidationMessage('Veuillez sélectionner les dates de réservation');
                        return false;
                    }
                    const start = new Date(startDate);
                    const end = new Date(endDate);
                    if (start > end) {
                        Swal.showValidationMessage('La date de fin doit être après la date de début');
                        return false;
                    }
                    return { customerName, customerPhone, startDate, endDate };
                },
                showCancelButton: true,
                confirmButtonText: 'Réserver',
                cancelButtonText: 'Annuler',
                confirmButtonColor: '#312783',
                cancelButtonColor: '#EF4444',
                backdrop: true,
                allowOutsideClick: () => !Swal.isLoading()
            });

            // Si l'utilisateur annule, ne rien faire
            if (!formValues) return;

            const { customerName, customerPhone, startDate, endDate } = formValues;

            // Ajouter à la base de données
            const newCustomer = await addCustomer({ name: customerName, phone: customerPhone });
            await addReservation({
                customer_id: newCustomer.id,
                car_id: carId,
                start_date: formatDateForMySQL(new Date(startDate)),
                end_date: formatDateForMySQL(new Date(endDate)),
                status: 'pending',
            });

            // Calcul de la durée
            const start = new Date(startDate);
            const end = new Date(endDate);
            const durationDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

            // Créer le message
            const messageText =
                `Bonjour, je souhaite réserver la ${carName}.\n\n` +
                `✅ Détails de ma réservation:\n` +
                `👤 Nom: ${customerName}\n` +
                `📱 Téléphone: ${customerPhone}\n` +
                `🗓️ Période: du ${startDate} au ${endDate}\n` +
                `⏱️ Durée: ${durationDays} jour${durationDays > 1 ? 's' : ''}`;

            // Nettoyer et valider le numéro de téléphone
            const phone = String(settings.phone || ""); // Assurer que c'est une chaîne
            const cleanPhone = phone.replace(/\D/g, '');
            if (cleanPhone.length !== 12 || !cleanPhone.startsWith('212')) {
                console.error('Numéro de téléphone invalide:', cleanPhone);
                throw new Error('Numéro de téléphone invalide');
            }

            // Utiliser le format wa.me comme dans le bouton flottant
            const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(messageText)}`;

            // Afficher le message de confirmation avec un délai avant la redirection
            Swal.fire({
                icon: 'success',
                title: 'Réservation enregistrée !',
                text: 'Vous allez être redirigé vers WhatsApp.',
                confirmButtonColor: '#312783',
                confirmButtonText: 'Continuer sur WhatsApp',
                allowOutsideClick: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    // Utiliser un <a> avec les attributs target="_blank" comme dans le bouton flottant
                    const link = document.createElement('a');
                    link.href = whatsappUrl;
                    link.target = "_blank";
                    link.rel = "noopener noreferrer";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            });
        } catch (error) {
            console.error('Erreur lors de la création de la réservation:', error);
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Une erreur est survenue lors de la réservation.',
                confirmButtonColor: '#EF4444',
            });
        }
    };

    const getUniqueBrandCars = (cars) => {
        const uniqueBrands = new Set();
        const selectedCars = [];
        
        for (const car of cars) {
            if (!uniqueBrands.has(car.brand) && selectedCars.length < 3) {
                uniqueBrands.add(car.brand);
                selectedCars.push(car);
            }
            if (selectedCars.length === 3) break;
        }
        
        if (selectedCars.length < 3) {
            const remainingCars = cars.filter(car => !selectedCars.includes(car));
            selectedCars.push(...remainingCars.slice(0, 3 - selectedCars.length));
        }
        
        return selectedCars;
    };



    const Header = memo(() => {

        const smoothScroll = (id) => {
            setIsMenuOpen(false);
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
            }
        };

        return (
            <header className="fixed w-full z-50 bg-transparent shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center cursor-pointer">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => smoothScroll('hero')}
                            className="flex items-center"
                        >
                            <img
                                src={Logo}
                                alt="Site Logo"
                                className="h-12 w-auto"
                            />

                            {/* Titre stylisé avec deux couleurs */}
                            <h2 className="ml-3 text-l font-bold">
                                <span className="text-black dark:text-white">BOTEN</span>
                                <span className="text-[#FFC107]">CAR</span>
                            </h2>
                        </motion.div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        {[
                            { name: 'Nos voitures', id: 'fleet' },
                            { name: 'Avantages', id: 'features' },
                            { name: 'Témoignages', id: 'testimonials' },
                            { name: 'Contact', id: 'contact' }
                        ].map((item) => (
                            <motion.a
                                key={item.id}
                                href={`#${item.id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    smoothScroll(item.id);
                                }}
                                className="text-gray-600 dark:text-gray-300 font-medium relative group"
                                whileHover={{ scale: 1.05 }}
                            >
                                {item.name}
                                <span className="absolute bottom-0 left-0 h-0.5 bg-[#FFC107] w-0 group-hover:w-full transition-all duration-300" />
                            </motion.a>
                        ))}
                    </nav>

                    {/* Dark Mode Toggle and Hamburger Menu */}
                    <div className="flex items-center space-x-4">
                        <motion.button
                            onClick={() => setDarkMode(!darkMode)}
                            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 shadow-sm hover:shadow-md transition-all"
                            whileTap={{ scale: 0.95 }}
                        >
                            {darkMode ? <Sun className="w-6 h-6 text-amber-400" /> : <Moon className="w-6 h-6 text-gray-600" />}
                        </motion.button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 text-gray-600 dark:text-gray-300"
                        >
                            {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="md:hidden bg-white dark:bg-gray-800 shadow-lg"
                        >
                            <nav className="flex flex-col space-y-4 p-4">
                                {[
                                    { name: 'Nos voitures', id: 'fleet' },
                                    { name: 'Avantages', id: 'features' },
                                    { name: 'Témoignages', id: 'testimonials' },
                                    { name: 'Contact', id: 'contact' }
                                ].map((item) => (
                                    <motion.a
                                        key={item.id}
                                        href={`#${item.id}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            smoothScroll(item.id);
                                        }}
                                        className="text-gray-600 dark:text-gray-300 font-medium"
                                    >
                                        {item.name}
                                    </motion.a>
                                ))}
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        );
    });



    const Hero = memo(() => {
        const { cars: fleetCarsFromContext, settings, addCustomer, addReservation } = useData();
        const [currentCarIndex, setCurrentCarIndex] = useState(0);
        const [autoScroll, setAutoScroll] = useState(true);
    
        const fleetCars = fleetCarsFromContext.length > 0 ? fleetCarsFromContext : cars;
        const heroDisplayCars = getUniqueBrandCars(fleetCars);
    
        useEffect(() => {
            let interval;
            if (autoScroll) {
                interval = setInterval(() => {
                    setCurrentCarIndex((prev) => (prev + 1) % heroDisplayCars.length);
                }, 5000);
            }
            return () => clearInterval(interval);
        }, [autoScroll, heroDisplayCars.length]);
    
        const fadeInUp = {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
        };

        const getCarLogo = (carBrand) => {
            if (!carBrand) return DaciaLogo;
            const brand = carBrand.toLowerCase();
            const logoMap = {
                'dacia': DaciaLogo,
                'renault': RenaultLogo,
                'tesla': TeslaLogo,
                'volkswagen': VolswagenLogo,
                'ford': FordLogo,
                'kia': KiaLogo,
                'bmw': BmwLogo,
                'peugeot': PeugeotLogo,
                'mercedes': MercedesLogo,
                'citroen': CitroenLogo,
                'audi': AudiLogo,
                'fiat': FiatLogo,
                'opel': OpelLogo,
                'skoda': SkodaLogo,
                'seat': SeatLogo,
                'toyota': ToyotaLogo,
                'nissan': NissanLogo,
                'honda': HondaLogo,
                'mitsubishi': MitsubishiLogo,
                'suzuki': SuzukiLogo,
                'chevrolet': ChevroletLogo,
                'dfsk': DfskLogo,
                'hyundai': HyundaiLogo,
            };
            return logoMap[brand] || DaciaLogo;
        };
    
        const getCarImage = (car) => {
            if (car.image_url) return car.image_url;
            const brand = car.brand?.toLowerCase();
            const imageMap = {
                'dacia': Dacia,
                'mercedes': Mercedes,
                'volkswagen': Touarg
            };
            return imageMap[brand] || Dacia;
        };
    
        return (
            <section 
            id="hero" 
            className="pt-24 pb-32 md:pt-28 md:pb-36 overflow-hidden 
            bg-gradient-to-b from-[#F5F5F5] to-white 
            dark:bg-gradient-to-b dark:from-[#1A1A1A] dark:to-[#4A4A4A]"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentCarIndex}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                            {/* Colonne de Contenu */}
                            <div className="space-y-6 md:space-y-8 order-2 lg:order-1 lg:col-span-5">
                            <div className="flex justify-center sm:justify-start">
                                <motion.div
                                    className="inline-flex items-center space-x-2 
                                    bg-[#4A4A4A]/10 dark:bg-[#FFC107]/20 
                                    px-4 py-2 rounded-full"
                                    {...fadeInUp}
                                >
                                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-[#FFC107]" />
                                    <span className="text-xs md:text-sm font-medium 
                                    text-[#1A1A1A] dark:text-white">
                                        {heroDisplayCars[currentCarIndex]?.available ? 'Disponible maintenant' : 'Réservation possible'}
                                    </span>
                                </motion.div>
                            </div>
    
                                {/* Titre et Description */}
                                <motion.h1
                                className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight 
                                text-[#1A1A1A] dark:text-white"
                                {...fadeInUp}
                                transition={{ delay: 0.1 }}
                            >
                                {heroDisplayCars[currentCarIndex]?.name || 'Véhicule de luxe'}
                                <span className="block mt-2 md:mt-4 text-base md:text-xl lg:text-2xl font-medium 
                                text-[#4A4A4A] dark:text-[#F5F5F5]">
                                    {heroDisplayCars[currentCarIndex]?.description || 'Une expérience de conduite exceptionnelle'}
                                </span>
                            </motion.h1>
    
                                {/* Grille des Spécifications */}
                                <motion.div
                                className="grid grid-cols-2 gap-3 md:gap-4"
                                {...fadeInUp}
                                transition={{ delay: 0.2 }}
                            >
                                {[
                                    { icon: <Bolt className="text-[#FFC107]" />, label: 'Puissance', value: heroDisplayCars[currentCarIndex]?.puissance || 'N/A' },
                                    { icon: <Clock className="text-[#FFC107]" />, label: '0-100 km/h', value: heroDisplayCars[currentCarIndex]?.acceleration || 'N/A' },
                                    { icon: <Fuel className="text-[#FFC107]" />, label: 'Consommation', value: heroDisplayCars[currentCarIndex]?.consumption || 'N/A' },
                                    { icon: <Repeat className="text-[#FFC107]" />, label: 'Transmission', value: heroDisplayCars[currentCarIndex]?.transmission || 'N/A' }
                                ].map((spec, i) => (
                                    <div
                                        key={i}
                                        className="p-3 md:p-4 rounded-xl 
                                        bg-[#F5F5F5] dark:bg-[#4A4A4A]/30 
                                        shadow-md border border-[#4A4A4A]/10 dark:border-[#FFC107]/20"
                                    >
                                        <div className="flex items-center space-x-2 text-[#FFC107] mb-2">
                                            {spec.icon}
                                            <span className="text-xs md:text-sm 
                                            text-[#4A4A4A] dark:text-[#F5F5F5]">
                                                {spec.label}
                                            </span>
                                        </div>
                                        <div className="text-base md:text-lg font-bold 
                                        text-[#1A1A1A] dark:text-white">
                                            {spec.value}
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                                {/* Section CTA */}
                                <motion.div
                                className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2"
                                {...fadeInUp}
                                transition={{ delay: 0.3 }}
                            >
                                <button
                                    onClick={() => handleWhatsAppReservation(
                                        heroDisplayCars[currentCarIndex]?.name,
                                        heroDisplayCars[currentCarIndex]?.id,
                                        addCustomer,
                                        addReservation
                                    )}
                                    className="px-6 py-3 
                                    bg-[#FFC107] text-[#1A1A1A] 
                                    dark:bg-[#FFC107] dark:text-[#1A1A1A]
                                    rounded-lg text-sm md:text-base font-medium 
                                    hover:bg-[#1A1A1A] hover:text-[#FFC107] 
                                    dark:hover:bg-white dark:hover:text-[#1A1A1A]
                                    transition-colors shadow-sm hover:shadow 
                                    flex items-center justify-center"
                                >
                                    <span>Réserver maintenant</span>
                                    <span className="ml-2">→</span>
                                </button>

                                <div className="flex items-center justify-center space-x-2 
                                px-4 py-3 border rounded-lg 
                                bg-white dark:bg-[#4A4A4A]/30 
                                border-[#4A4A4A]/20 dark:border-[#FFC107]/20 
                                hover:bg-[#F5F5F5] dark:hover:bg-[#4A4A4A]/50 
                                transition-colors">
                                    <span className="text-xs md:text-sm 
                                    text-[#4A4A4A] dark:text-[#F5F5F5]">À partir de</span>
                                    <span className="text-lg md:text-xl font-bold 
                                    text-[#FFC107]">
                                        {heroDisplayCars[currentCarIndex]?.price || '---'}DH
                                    </span>
                                    <span className="text-xs md:text-sm 
                                    text-[#4A4A4A] dark:text-[#F5F5F5]">/jour</span>
                                </div>
                            </motion.div>
                        </div>
    
                            <div className="relative order-1 lg:order-2 lg:col-span-7">
                            <motion.div
                                className="relative rounded-2xl overflow-hidden shadow-xl h-64 sm:h-72 md:h-80 lg:h-96"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6 }}
                            >
                                {/* Fond avec dégradé */}
                                <div className="absolute inset-0 
                                bg-gradient-to-br from-[#1A1A1A] to-[#FFC107] 
                                dark:from-[#4A4A4A] dark:to-[#FFC107] 
                                opacity-80">
                                        {/* Forme géométrique */}
                                        <motion.div
                                            className="absolute w-80 h-80 rounded-full bg-[#1A1A1A] blur-md"
                                            style={{ top: '-30%', right: '-10%' }}
                                            animate={{
                                                y: [0, 8, 0],
                                                scale: [1, 1.05, 1],
                                            }}
                                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                        />
    
                                        {/* Motif en surimpression */}
                                        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
                                    </div>
    
                                    {/* Image de la voiture */}
                                    <motion.img
                                        src={heroDisplayCars[currentCarIndex] ? getCarImage(heroDisplayCars[currentCarIndex]) : Dacia}
                                        alt={heroDisplayCars[currentCarIndex]?.name || 'Véhicule'}
                                        className="w-full h-full object-contain relative z-10"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.2, duration: 0.5 }}
                                        whileHover={{ scale: 1.02, rotateY: 3 }}
                                    />
    
                                    {/* Badge Logo */}
                                    <motion.div
                                        className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-lg z-20"
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.4 }}
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        <img
                                            src={heroDisplayCars[currentCarIndex] ? getCarLogo(heroDisplayCars[currentCarIndex].brand) : DaciaLogo}
                                            alt="Logo"
                                            className="w-8 h-8 object-contain"
                                        />
                                    </motion.div>
    
                                    {/* Effet réfléchissant en bas */}
                                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/20 to-transparent z-10"></div>
                                </motion.div>
    
                                {/* Icônes de sélection de marque */}
                                <div className="absolute -bottom-20 md:-bottom-24 left-1/2 transform -translate-x-1/2 w-full flex justify-center">
                                <div className="flex space-x-2 md:space-x-3 py-3 px-2 
                                overflow-x-auto bg-white/80 dark:bg-[#4A4A4A]/60 
                                backdrop-blur-sm rounded-xl shadow-md">
                                    {heroDisplayCars.map((car, index) => (
                                        <motion.button
                                            key={car.id || index}
                                            onClick={() => {
                                                setAutoScroll(false);
                                                setCurrentCarIndex(index);
                                            }}
                                            whileHover={{ scale: 1.05 }}
                                            className={`min-w-[60px] md:min-w-[70px] h-[60px] md:h-[70px] 
                                            rounded-lg flex items-center justify-center transition-all ${
                                                currentCarIndex === index
                                                    ? 'ring-2 ring-[#FFC107] bg-white dark:bg-[#1A1A1A] shadow-md'
                                                    : 'opacity-70 hover:opacity-100 bg-white/60 dark:bg-[#4A4A4A]/30'
                                            }`}
                                        >
                                            <img
                                                src={getCarLogo(car.brand)}
                                                alt={`${car.brand} Logo`}
                                                className="w-10 h-10 md:w-12 md:h-12 object-contain p-1"
                                            />
                                        </motion.button>
                                    ))}
                                </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>
        );
    }, (prevProps, nextProps) => prevProps.fleetCarsFromContext === nextProps.fleetCarsFromContext);


    const Fleet = memo(() => {
        const { cars: fleetCars, updateCar, addCustomer, addReservation } = useData();
        const [userVotes, setUserVotes] = useState(() => {
            try {
                const storedUserVotes = localStorage.getItem('userVotes');
                return storedUserVotes ? JSON.parse(storedUserVotes) : {};
            } catch (error) {
                console.error('Error parsing userVotes from localStorage:', error);
                return {};
            }
        });
        const [selectedBrand, setSelectedBrand] = useState(() => {
            const savedBrand = localStorage.getItem('selectedBrand');
            return savedBrand ? savedBrand.toLowerCase() : 'tous';
        });
        const [imagesLoaded, setImagesLoaded] = useState({});

        const brandCorrections = {
            dacia: 'dacia',
            renault: 'renault',
            tesla: 'tesla',
            volkswagen: 'volkswagen',
            ford: 'ford',
            kia: 'kia',
            bmw: 'bmw',
            peugeot: 'peugeot',
            mercedes: 'mercedes',
            citroen: 'citroen',
            audi: 'audi',
            fiat: 'fiat',
            opel: 'opel',
            skoda: 'skoda',
            seat: 'seat',
            toyota: 'toyota',
            nissan: 'nissan',
            honda: 'honda',
            mitsubishi: 'mitsubishi',
            suzuki: 'suzuki',
            chevrolet: 'chevrolet',
            dfsk: 'dfsk',
        };

        const correctedFleetCars = Array.isArray(fleetCars)
            ? fleetCars.map((car) => ({
                ...car,
                brand: brandCorrections[car.brand.toLowerCase()] || car.brand.toLowerCase(),
            }))
            : [];

        const brands = ['tous', ...new Set(correctedFleetCars.map((car) => car.brand))];

        const handleBrandSelect = (brand) => setSelectedBrand(brand.toLowerCase());

        useEffect(() => {
            localStorage.setItem('selectedBrand', selectedBrand);
            localStorage.setItem('userVotes', JSON.stringify(userVotes));
        }, [selectedBrand, userVotes]);

        const handleStarClick = async (carId) => {
            if (!userVotes[carId]) {
                setUserVotes((prev) => ({ ...prev, [carId]: true }));
                try {
                    const car = correctedFleetCars.find((c) => c.id === carId);
                    if (!car) return;
                    const updatedVoteCount = (car.vote || 0) + 1;
                    const formData = new FormData();
                    formData.append('name', car.name);
                    formData.append('brand', car.brand);
                    formData.append('price', car.price);

                    // Fix: Maintain the same availability status
                    // Convert from numeric format (1/0) to string format ('true'/'false')
                    formData.append('available', car.available === 1 ? 'true' : 'false');

                    formData.append('description', car.description || '');
                    formData.append('consumption', car.consumption || '');
                    formData.append('acceleration', car.acceleration || '');
                    formData.append('transmission', car.transmission || '');
                    formData.append('vote', updatedVoteCount);
                    await updateCar(carId, formData);
                    Swal.fire({
                        icon: 'success',
                        title: 'Vote enregistré !',
                        text: 'Merci pour votre vote.',
                        confirmButtonColor: '##19e32d',
                    });
                } catch (error) {
                    console.error('Error updating vote:', error);
                    setUserVotes((prev) => ({ ...prev, [carId]: false }));
                    Swal.fire({
                        icon: 'error',
                        title: 'Erreur',
                        text: 'Une erreur est survenue lors du vote.',
                        confirmButtonColor: '#EF4444',
                    });
                }
            } else {
                Swal.fire({
                    icon: 'info',
                    title: 'Déjà voté',
                    text: 'Vous avez déjà voté pour cette voiture.',
                    confirmButtonColor: '##19e32d',
                });
            }
        };

        const handleImageLoad = (carId) => {
            setImagesLoaded(prev => ({ ...prev, [carId]: true }));
        };

        const handleImageError = (carId) => {
            setImagesLoaded(prev => ({ ...prev, [carId]: true }));
        };

        const hasUserVoted = (carId) => userVotes[carId] === true;
        const filteredCars = correctedFleetCars.filter(
            (car) => selectedBrand === 'tous' || car.brand === selectedBrand
        );

        const logoMap = {
            tous: Logo,
            dacia: DaciaLogo,
            renault: RenaultLogo,
            tesla: TeslaLogo,
            volkswagen: VolswagenLogo,
            ford: FordLogo,
            kia: KiaLogo,
            bmw: BmwLogo,
            peugeot: PeugeotLogo,
            mercedes: MercedesLogo,
            citroen: CitroenLogo,
            audi: AudiLogo,
            fiat: FiatLogo,
            opel: OpelLogo,
            skoda: SkodaLogo,
            seat: SeatLogo,
            toyota: ToyotaLogo,
            nissan: NissanLogo,
            honda: HondaLogo,
            mitsubishi: MitsubishiLogo,
            suzuki: SuzukiLogo,
            chevrolet: ChevroletLogo,
            dfsk: DfskLogo,
            hyundai: HyundaiLogo,
        };

        // Skeleton card for loading state
        const SkeletonCard = () => (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700"
            >
                <div className="h-32 sm:h-48 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                <div className="p-3 sm:p-6">
                    <div className="flex justify-between items-start mb-2">
                        <div className="h-5 sm:h-6 bg-gray-300 dark:bg-gray-600 rounded w-2/3 animate-pulse"></div>
                        <div className="h-5 w-16 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse"></div>
                    </div>
                    <div className="h-3 sm:h-4 bg-gray-300 dark:bg-gray-600 rounded w-full mb-2 animate-pulse"></div>
                    <div className="h-3 sm:h-4 bg-gray-300 dark:bg-gray-600 rounded w-4/5 mb-3 sm:mb-4 animate-pulse"></div>

                    <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4 bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                        <div className="h-4 sm:h-5 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                        <div className="h-4 sm:h-5 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                        <div className="h-4 sm:h-5 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                        <div className="h-4 sm:h-5 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                    </div>

                    <div className="flex items-center mb-3 sm:mb-4">
                        <div className="h-5 sm:h-6 w-5 sm:w-6 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
                        <div className="ml-1 sm:ml-2 h-4 w-16 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                    </div>

                    <div className="h-10 sm:h-12 bg-gray-300 dark:bg-gray-600 rounded-lg sm:rounded-xl w-full animate-pulse"></div>
                </div>
            </motion.div>
        );

        return (
            <section id="fleet" className="py-8 sm:py-16 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-3 sm:px-6">
                    <h2 className="text-2xl sm:text-4xl font-bold text-center mb-6 sm:mb-12 text-gray-900 dark:text-gray-100">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1A1A1A] to-[#FFC107] dark:from-[#FFC107] dark:to-white">
                        Notre flotte de véhicules
                    </span>
                    </h2>

                    {/* Filtres de marque */}
                    <div className="mb-6 sm:mb-10 flex overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible gap-3 sm:gap-4 md:gap-6 hide-scrollbar">
                        {brands.map((brand) => (
                            <motion.button
                                key={brand}
                                onClick={() => handleBrandSelect(brand)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className={`flex-shrink-0 flex flex-col items-center p-2 sm:p-3 md:p-4 rounded-xl transition-all ${
                                    selectedBrand === brand
                                        ? 'bg-white dark:bg-gray-800 shadow-xl border-2 border-[#FFC107] dark:border-[#FFC107] transform translate-y-[-4px]'
                                        : 'bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 border-2 border-transparent shadow-md'
                                }`}
                            >
                                <img
                                    src={logoMap[brand] || Logo}
                                    alt={brand}
                                    className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 object-contain mb-1 sm:mb-2"
                                />
                                <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                                {brand.charAt(0).toUpperCase() + brand.slice(1)}
                            </span>
                            </motion.button>
                        ))}
                    </div>

                    {/* Grille de voitures ou Skeleton Loading */}
                    {Array.isArray(filteredCars) && filteredCars.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                            {filteredCars.map((car) => (
                                <motion.div
                                    key={car.id}
                                    whileHover={{ y: -8, scale: 1.03 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300"
                                >
                                    {/* Fixed image container with consistent height and proper centering */}
                                    <div className="relative h-32 sm:h-48 bg-gray-100 dark:bg-gray-700 overflow-hidden flex items-center justify-center">
                                        {!imagesLoaded[car.id] && (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="animate-pulse flex flex-col items-center">
                                                    <div className="rounded-full h-12 w-12 bg-gradient-to-r from-[#FFC107] to-yellow-600 dark:from-[#FFC107] dark:to-yellow-600 mb-2"></div>
                                                    <div className="h-2 w-24 bg-gray-200 dark:bg-gray-600 rounded"></div>
                                                </div>
                                            </div>
                                        )}

                                        {car.image_url ? (
                                            <img
                                                src={car.image_url}
                                                alt={car.name}
                                                className={`w-full h-full transition-opacity duration-300 ${imagesLoaded[car.id] ? 'opacity-100' : 'opacity-0'}`}
                                                onLoad={() => handleImageLoad(car.id)}
                                                onError={() => handleImageError(car.id)}
                                                style={{ objectFit: 'contain', maxHeight: '100%', maxWidth: '100%' }}
                                            />
                                        ) : (
                                            <img
                                                src={
                                                    car.brand === 'dacia' ? Dacia :
                                                        car.brand === 'mercedes' ? Mercedes :
                                                            car.brand === 'volkswagen' ? Touarg : Dacia
                                                }
                                                alt={car.name}
                                                className={`w-full h-full transition-opacity duration-300 ${imagesLoaded[car.id] ? 'opacity-100' : 'opacity-0'}`}
                                                onLoad={() => handleImageLoad(car.id)}
                                                onError={() => handleImageError(car.id)}
                                                style={{ objectFit: 'contain', maxHeight: '100%', maxWidth: '100%' }}
                                            />
                                        )}

                                        {/* Badge prix */}
                                        <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-gradient-to-r from-[#FFC107] to-yellow-400 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium shadow-md">
                                            {car.price}DH/j
                                        </div>

                                        {/* Badge logo */}
                                        <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-white dark:bg-gray-800 p-1 sm:p-2 rounded-full shadow-md transform hover:scale-110 transition-transform duration-200">
                                            <img
                                                src={logoMap[car.brand] || Logo}
                                                alt={`${car.brand} Logo`}
                                                className="w-5 h-5 sm:w-7 sm:h-7 object-contain"
                                            />
                                        </div>
                                    </div>

                                    <div className="p-3 sm:p-6">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-sm sm:text-xl font-bold text-gray-800 dark:text-gray-200 line-clamp-1">
                                                {car.name}
                                            </h3>
                                            <div
                                                className={`${
                                                    car.available
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                                                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                                                } px-2 py-1 rounded-lg text-xs flex items-center space-x-1`}
                                            >
                                            <span
                                                className={`inline-block w-2 h-2 rounded-full ${
                                                    car.available ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                                                }`}
                                            ></span>
                                                <span>{car.available ? 'Disponible' : 'Réservée'}</span>
                                            </div>
                                        </div>

                                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 italic">
                                            {car.description || 'Pas de description'}
                                        </p>

                                        <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4 bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg">
                                            <div className="flex items-center">
                                                <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-[#FFC107] dark:text-[#FFC107]" />
                                                <span className="text-xs sm:text-sm dark:text-white">{car.acceleration || 'N/A'}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Fuel className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-[#FFC107] dark:text-[#FFC107]" />
                                                <span className="text-xs sm:text-sm dark:text-white">{car.consumption || 'N/A'}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Bold className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-[#FFC107] dark:text-[#FFC107]" />
                                                <span className="text-xs sm:text-sm dark:text-white">{car.puissance || 'N/A'}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Repeat className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-[#FFC107] dark:text-[#FFC107]" />
                                                <span className="text-xs sm:text-sm dark:text-white">{car.transmission || 'N/A'}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center mb-3 sm:mb-4">
                                            <button
                                                onClick={() => handleStarClick(car.id)}
                                                disabled={hasUserVoted(car.id)}
                                                className={`transition-all ${hasUserVoted(car.id) ? 'opacity-75 cursor-not-allowed' : 'hover:scale-110'}`}
                                            >
                                                <Star
                                                    className="w-5 h-5 sm:w-6 sm:h-6 dark:text-white"
                                                    fill={hasUserVoted(car.id) ? 'gold' : 'none'}
                                                    stroke={hasUserVoted(car.id) ? 'gold' : 'currentColor'}
                                                    strokeWidth={2}
                                                />
                                            </button>
                                            <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                                            {car.vote || 0} votes
                                        </span>
                                        </div>

                                        <button
                                            onClick={() => handleWhatsAppReservation(car.name, car.id, addCustomer, addReservation)}
                                            className={`w-full py-2 sm:py-3 text-xs sm:text-base font-medium rounded-lg sm:rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-md ${
                                                car.available
                                                    ? 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-400 hover:to-green-600 text-white hover:shadow-lg'
                                                    : 'bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed'
                                            }`}
                                            disabled={!car.available}
                                        >
                                            <Car className="w-4 h-4 sm:w-5 sm:h-5" />
                                            <span>{car.available ? 'Réserver' : 'Non disponible'}</span>
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        // Skeleton loading quand aucune voiture n'est trouvée
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                                <SkeletonCard key={index} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        );
    });


    const Features = memo(() => {
        const [activeSlide, setActiveSlide] = useState(0);
        const [isAutoplay, setIsAutoplay] = useState(true);
        const [isMobile, setIsMobile] = useState(false);


        // Vérifier si l'écran est en mode mobile
        useEffect(() => {
            const checkIfMobile = () => {
                setIsMobile(window.innerWidth < 1024);
            };

            checkIfMobile();
            window.addEventListener('resize', checkIfMobile);

            return () => window.removeEventListener('resize', checkIfMobile);
        }, []);

        // Autoplay pour le carrousel mobile
        useEffect(() => {
            let interval;

            if (isAutoplay && isMobile) {
                interval = setInterval(() => {
                    setActiveSlide(prev => (prev + 1) % featureData.length);
                }, 5000);
            }

            return () => clearInterval(interval);
        }, [isAutoplay, isMobile]);

        const featureData = [
            {
                icon: <Car className="w-6 h-6" />,
                emoji: "🚗",
                title: "Livraison Gratuite",
                content: "Livraison et récupération à l'adresse de votre choix, sans frais supplémentaires dans un rayon de 20km.",
                color: "from-red-500 to-orange-500"
            },
            {
                icon: <Shield className="w-6 h-6" />,
                emoji: "🛡️",
                title: "Assurance Tous Risques",
                content: "Couverture tous risques incluse dans chaque location avec assistance 24/7 et 5000DH de franchise.",
                color: "from-blue-400 to-cyan-500"
            },
            {
                icon: <PhoneCall className="w-6 h-6" />,
                emoji: "📱",
                title: "Service Client 24/7",
                content: "Une équipe multilingue à votre disposition à tout moment pour répondre à toutes vos questions.",
                color: "from-yellow-400 to-amber-500"
            },
            {
                icon: <Settings className="w-6 h-6" />,
                emoji: "⚙️",
                title: "Entretien Premium",
                content: "Tous nos véhicules bénéficient d'un entretien régulier et sont vérifiés après chaque location.",
                color: "from-[#5a4bbd] to-[#312783]"
            },
            {
                icon: <CreditCard className="w-6 h-6" />,
                emoji: "💳",
                title: "Paiement Flexible",
                content: "Multiples options de paiement adaptées à vos besoins, avec possibilité d'échelonnement sans frais.",
                color: "from-purple-400 to-indigo-500"
            },
            {
                icon: <Clock className="w-6 h-6" />,
                emoji: "⏱️",
                title: "Réservation Express",
                content: "Processus de réservation simplifié, validation instantanée et modification gratuite jusqu'à 48h avant.",
                color: "from-pink-400 to-rose-500"
            }
        ];

        const containerVariants = {
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.2
                }
            }
        };

        const itemVariants = {
            hidden: { y: 30, opacity: 0 },
            visible: {
                y: 0,
                opacity: 1,
                transition: {
                    duration: 0.6,
                    ease: [0.25, 0.1, 0.25, 1.0]
                }
            }
        };

        const handleSlideChange = (index) => {
            setActiveSlide(index);
            setIsAutoplay(false);
            // Réactive l'autoplay après 8 secondes d'inactivité
            setTimeout(() => setIsAutoplay(true), 8000);
        };

        return (
            <section id="features" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-tr from-gray-50 via-white to-[#AFDBF5] dark:from-gray-900 dark:to-gray-950 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    {/* Éléments de fond décoratifs */}
                    <div className="absolute top-0 left-0 w-72 h-72 bg-[#AFDBF5] dark:bg-amber-700 rounded-full filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#AFDBF5] dark:bg-[#AFDBF5] rounded-full filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="text-center mb-16 relative z-10"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="mb-4"
                        >
                        <span className="inline-block py-1 px-3 rounded-full text-xs font-semibold tracking-wider text-amber-800 bg-amber-100 dark:bg-amber-900 dark:text-amber-200">
                            PREMIUM SERVICE
                        </span>
                        </motion.div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100 leading-tight">
                            Nos Avantages <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Exclusifs</span>
                        </h2>
                        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-base sm:text-lg">
                            Découvrez pourquoi notre service de location est le choix privilégié des voyageurs exigeants
                        </p>
                    </motion.div>

                    {/* Version Mobile: Carousel amélioré */}
                    <div className="lg:hidden relative">
                        <div className="overflow-hidden rounded-xl">
                            <div
                                className="flex transition-transform duration-500 ease-out"
                                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                            >
                                {featureData.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="w-full flex-shrink-0 p-1"
                                    >
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.1, duration: 0.5 }}
                                            viewport={{ once: true }}
                                            className="h-full p-6 rounded-3xl bg-white dark:bg-gray-800 shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col"
                                        >
                                            <div className={`mb-5 self-start inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} shadow-lg`}>
                                                <div className="text-white">{feature.icon}</div>
                                            </div>
                                            <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                                                {feature.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                                {feature.content}
                                            </p>
                                        </motion.div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Contrôles de navigation */}
                        <div className="mt-6 flex items-center justify-center gap-4">
                            <button
                                onClick={() => handleSlideChange((activeSlide - 1 + featureData.length) % featureData.length)}
                                className="p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300"
                                aria-label="Slide précédent"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 dark:text-gray-400">
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                            </button>

                            <div className="flex space-x-2">
                                {featureData.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSlideChange(index)}
                                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                                            activeSlide === index
                                                ? 'bg-[#0061ff] w-6'
                                                : 'bg-gray-300 dark:bg-gray-700'
                                        }`}
                                        aria-label={`Aller à la diapositive ${index + 1}`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={() => handleSlideChange((activeSlide + 1) % featureData.length)}
                                className="p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300"
                                aria-label="Slide suivant"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 dark:text-gray-400">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Version Desktop: Grille améliorée */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10"
                    >
                        {featureData.map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{
                                    y: -8,
                                    scale: 1.02,
                                    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
                                    transition: { duration: 0.3 }
                                }}
                                className="group p-8 rounded-3xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl dark:shadow-gray-900/30 dark:hover:shadow-gray-800/40 border border-gray-100 dark:border-gray-700 transition-all duration-300 backdrop-blur-sm bg-white/70 dark:bg-gray-800/70"
                            >
                                <div className={`mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                                    <div className="text-white">{feature.icon}</div>
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors duration-300">
                                    {feature.title}
                                </h3>
                                <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">{feature.content}</p>

                                <div className="mt-6 h-0.5 w-16 bg-gradient-to-r from-amber-300 to-amber-500 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300 origin-left"></div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="mt-16 text-center relative z-10"
                    >
                        <a
                            href="#fleet"
                            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-br from-[#312783] to-[#0061ff] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:translate-y-0 group"
                        >
                            <span>Découvrir notre flotte</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                                <path d="M5 12h14"></path>
                                <path d="M12 5l7 7-7 7"></path>
                            </svg>
                        </a>

                        <div className="mt-8">
                            <p className="text-sm text-gray-500 dark:text-gray-500">
                                Plus de 10 000 clients satisfaits • Note moyenne de 4.9/5
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        );
    });





    const Testimonials = memo(() => {
        const { testimonials = [], addTestimonial, settings } = useData();
        const [isSubmitting, setIsSubmitting] = useState(false);
        const [currentPage, setCurrentPage] = useState(1);
        const [itemsPerPage, setItemsPerPage] = useState(3);
        const [filteredRating, setFilteredRating] = useState(0);
        const [showFilters, setShowFilters] = useState(false);
        const containerRef = useRef(null);

        // Adjust items per page based on screen size
        useEffect(() => {
            const handleResize = () => {
                if (window.innerWidth < 640) setItemsPerPage(1);
                else if (window.innerWidth < 1024) setItemsPerPage(2);
                else setItemsPerPage(3);
            };
            handleResize();
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);

        // Filter and paginate testimonials
        const filteredTestimonials = testimonials.filter(
            testimonial => filteredRating === 0 || testimonial.rating === filteredRating
        );
        const totalPages = Math.ceil(filteredTestimonials.length / itemsPerPage);
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentTestimonials = filteredTestimonials.slice(indexOfFirstItem, indexOfLastItem);

        const handlePageChange = (newPage) => {
            setCurrentPage(newPage);
            containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        };

        // Handle adding a new testimonial via SweetAlert2 modal
        const handleAddTestimonial = async () => {
            const { value: formValues } = await Swal.fire({
                title: 'Share Your Experience',
                html: `
                <style>
                    .form-container { width: 100%; margin: 0 auto; padding: 0; }
                    .form-group { margin-bottom: 16px; }
                    .swal2-input, .swal2-textarea { 
                        width: 100% !important; 
                        margin: 0 !important; 
                        padding: 12px 16px !important; 
                        font-size: 15px !important; 
                        border-radius: 8px !important; 
                        border: 1px solid #ddd !important; 
                        box-shadow: 0 2px 8px rgba(0,0,0,0.05) !important;
                        box-sizing: border-box !important;
                        transition: all 0.2s ease !important;
                    }
                    .swal2-input:focus, .swal2-textarea:focus { 
                        border-color: #800000 !important; 
                        box-shadow: 0 0 0 3px rgba(9, 134, 233, 0.2) !important; 
                    }
                    .swal2-input { height: 48px; }
                    .swal2-textarea { min-height: 110px; resize: vertical; }
                    .input-label { 
                        display: block; 
                        margin-bottom: 8px; 
                        font-size: 14px; 
                        font-weight: 600; 
                        color: #4B5563; 
                    }
                    .rating-selector {
                        display: flex;
                        flex-direction: row-reverse;
                        justify-content: flex-end;
                        gap: 8px;
                    }
                    .rating-selector input {
                        display: none;
                    }
                    .rating-selector label {
                        cursor: pointer;
                    }
                    .rating-selector label svg {
                        width: 24px;
                        height: 24px;
                        fill: none;
                        stroke: #FFC107;
                        stroke-width: 2;
                    }
                    .rating-selector input:checked ~ label svg,
                    .rating-selector label:hover svg,
                    .rating-selector label:hover ~ label svg {
                        fill: #FFC107;
                    }
                    @media (min-width: 768px) {
                        .form-container { max-width: 480px; padding: 0 10px; }
                        .swal2-popup { width: auto !important; min-width: 540px !important; padding: 2em !important; border-radius: 16px !important; }
                        .swal2-title { font-size: 26px !important; margin-bottom: 20px !important; }
                        .swal2-input, .swal2-textarea { font-size: 16px !important; }
                        .input-label { font-size: 15px; }
                        .swal2-textarea { min-height: 140px; }
                    }
                    @media (max-width: 767px) {
                        .form-container { max-width: 100%; padding: 0 5px; }
                        .swal2-popup { padding: 1.2em !important; width: 90% !important; max-width: 400px !important; border-radius: 16px !important; }
                        .swal2-title { font-size: 20px !important; padding: 10px 0 !important; }
                        .swal2-actions { margin-top: 16px !important; }
                    }
                </style>
                <div class="form-container">
                    <div class="form-group">
                        <label class="input-label" for="swal-name">Nom:</label>
                        <input id="swal-name" class="swal2-input" placeholder="Your name" required>
                    </div>
                    <div class="form-group">
                        <label class="input-label" for="swal-role">Role:</label>
                        <input id="swal-role" class="swal2-input" placeholder="e.g., Client, Partner, etc." required>
                    </div>
                    <div class="form-group">
                        <label class="input-label" for="swal-content">AVIS:</label>
                        <textarea id="swal-content" class="swal2-textarea" placeholder="Share your experience with us..." required></textarea>
                    </div>
                    <div class="form-group">
                        <label class="input-label">VOTE:</label>
                        <div class="rating-selector">
                            <input type="radio" id="star5" name="rating" value="5" />
                            <label for="star5"><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg></label>
                            <input type="radio" id="star4" name="rating" value="4" />
                            <label for="star4"><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg></label>
                            <input type="radio" id="star3" name="rating" value="3" />
                            <label for="star3"><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg></label>
                            <input type="radio" id="star2" name="rating" value="2" />
                            <label for="star2"><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg></label>
                            <input type="radio" id="star1" name="rating" value="1" />
                            <label for="star1"><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg></label>
                        </div>
                    </div>
                </div>
            `,
                focusConfirm: false,
                customClass: {
                    container: 'custom-swal-container',
                    popup: 'custom-swal-popup',
                    title: 'custom-swal-title',
                    confirmButton: 'custom-swal-confirm',
                    cancelButton: 'custom-swal-cancel'
                },
                preConfirm: () => {
                    const name = document.getElementById('swal-name').value;
                    const role = document.getElementById('swal-role').value;
                    const content = document.getElementById('swal-content').value;
                    const rating = document.querySelector('input[name="rating"]:checked')?.value;

                    if (!name || !role || !content || !rating) {
                        Swal.showValidationMessage('Please fill in all required fields');
                        return false;
                    }
                    return { name, role, content, rating: parseInt(rating) };
                },
                showCancelButton: true,
                confirmButtonText: 'Submit',
                cancelButtonText: 'Cancel',
                confirmButtonColor: '#19e32d',
                cancelButtonColor: '#6B7280',
                buttonsStyling: true,
                backdrop: true,
                allowOutsideClick: () => !Swal.isLoading()
            });

            if (!formValues) return;

            setIsSubmitting(true);
            try {
                await addTestimonial(formValues);
                const isMobile = window.innerWidth < 768;
                Swal.fire({
                    icon: 'success',
                    title: 'Thank You for Your Testimonial!',
                    text: 'Your feedback has been successfully added.',
                    confirmButtonColor: '#800000',
                    width: isMobile ? 'auto' : '450px',
                    padding: isMobile ? '1.2em' : '2em',
                    customClass: {
                        popup: 'animate__animated animate__fadeInUp'
                    }
                });
            } catch (error) {
                console.error('Error adding testimonial:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'An Error Occurred',
                    text: 'We couldn’t add your testimonial. Please try again later.',
                    confirmButtonColor: '#EF4444',
                    width: window.innerWidth < 768 ? 'auto' : '450px',
                    padding: window.innerWidth < 768 ? '1.2em' : '2em'
                });
            } finally {
                setIsSubmitting(false);
            }
        };

        // Star rating component
        const StarRating = ({ rating }) => {
            return (
                <div className="flex">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            className={`w-5 h-5 ${
                                i < rating
                                    ? 'text-yellow-400'
                                    : 'text-gray-200 dark:text-gray-700'
                            }`}
                            fill={i < rating ? "#fff947" : "none"}
                            strokeWidth={1.5}
                        />
                    ))}
                </div>
            );
        };

        return (
            <section
                id="testimonials"
                ref={containerRef}
                className="py-20 bg-gradient-to-b from-[#F0F9FF] to-white dark:from-gray-900 dark:to-gray-800"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
                        <div className="text-center sm:text-left mb-6 sm:mb-0">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100 leading-tight">
                            Nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Clients</span>
                        </h2>
                        <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-base sm:text-lg">
                        PARTAGER VOTRE EXPERTISE AVEC NOUS 
                        </p>
                        </div>
                        <motion.button
                            onClick={handleAddTestimonial}
                            disabled={isSubmitting}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-6 py-3 rounded-lg text-white font-medium flex items-center space-x-2 shadow-md transition-all ${
                                isSubmitting
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-green-400 hover:bg-green-500'
                            }`}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                                    <span>Submitting...</span>
                                </>
                            ) : (
                                <>
                                    <PlusCircle className="w-4 h-4" />
                                    <span>Commenter</span>
                                </>
                            )}
                        </motion.button>
                    </div>

                    <div className="flex flex-col items-center mb-10">
                        <div className="w-full flex justify-between items-center">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="sm:hidden px-4 py-2 text-[#FFC107] font-medium flex items-center space-x-1"
                            >
                                <span>Filter</span>
                                <ChevronDown className={`w-4 h-4 transform ${showFilters ? 'rotate-180' : ''}`} />
                            </button>
                            <div className={`sm:flex flex-wrap justify-center gap-2 ${showFilters ? 'block' : 'hidden'} sm:block`}>
                                {[0, 5, 4, 3, 2, 1].map((rating) => (
                                    <button
                                        key={rating}
                                        onClick={() => {
                                            setFilteredRating(rating);
                                            setCurrentPage(1);
                                        }}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                            filteredRating === rating
                                                ? 'bg-yellow-400 text-white hover:bg-yellow'
                                                : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                        }`}
                                    >
                                        {rating === 0 ? 'All' : `${rating} ★`}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {filteredTestimonials.length > 0 ? (
                        <>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentPage}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                                >
                                    {currentTestimonials.map((testimonial, index) => (
                                        <motion.div
                                            key={testimonial.id}
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                                transition: { delay: index * 0.1, duration: 0.4 }
                                            }}
                                            className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-lg p-6 border-t-4 border-[#FFC107] transition-transform duration-200 hover:-translate-y-2"
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex items-center">
                                                    <div className="w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center mr-4">
                                                        <span className="text-white font-bold">{testimonial.name[0]}</span>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900 dark:text-gray-100">{testimonial.name}</h4>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                                                    </div>
                                                </div>
                                                <StarRating rating={testimonial.rating} />
                                            </div>
                                            <div className="text-gray-600 dark:text-gray-300 text-base leading-relaxed italic">
                                                “{testimonial.content.length > 150
                                                ? `${testimonial.content.substring(0, 150).replace('Test Drive', settings.siteName || 'Test Drive')}...`
                                                : testimonial.content.replace('Test Drive', settings.siteName || 'Test Drive')
                                            }”
                                            </div>
                                            {testimonial.content.length > 150 && (
                                                <motion.button
                                                    className="mt-3 text-[#2A6F85] hover:text-yellow font-medium flex items-center space-x-1"
                                                    whileHover={{ x: 5 }}
                                                    onClick={() => {
                                                        Swal.fire({
                                                            title: `${testimonial.name}, ${testimonial.role}`,
                                                            html: `
                                                            <div class="flex justify-center mb-4">
                                                                ${[...Array(testimonial.rating)].map(() =>
                                                                '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#fff947] inline-block" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd"></path></svg>'
                                                            ).join('')}
                                                            </div>
                                                            <p class="text-left">${testimonial.content.replace('Test Drive', settings.siteName || 'Test Drive')}</p>
                                                        `,
                                                            confirmButtonColor: '#800000',
                                                            width: 'auto',
                                                            customClass: {
                                                                popup: 'rounded-xl',
                                                                content: 'text-left'
                                                            }
                                                        });
                                                    }}
                                                >
                                                    <span>LIRE PLUS</span>
                                                    <ArrowRight className="w-4 h-4" />
                                                </motion.button>
                                            )}
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </AnimatePresence>

                            {totalPages > 1 && (
                                <div className="flex justify-center mt-12">
                                    <div className="inline-flex items-center bg-white dark:bg-gray-800 rounded-lg shadow-md p-1">
                                        <button
                                            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                            disabled={currentPage === 1}
                                            className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all ${
                                                currentPage === 1
                                                    ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                            }`}
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>

                                        {[...Array(totalPages)].map((_, index) => {
                                            const pageNum = index + 1;
                                            if (
                                                pageNum === 1 ||
                                                pageNum === totalPages ||
                                                (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                                            ) {
                                                return (
                                                    <button
                                                        key={pageNum}
                                                        onClick={() => handlePageChange(pageNum)}
                                                        className={`flex items-center justify-center w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                                                            currentPage === pageNum
                                                                ? 'bg-gray-500 text-white'
                                                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                                        }`}
                                                    >
                                                        {pageNum}
                                                    </button>
                                                );
                                            } else if (
                                                (pageNum === currentPage - 2 && currentPage > 3) ||
                                                (pageNum === currentPage + 2 && currentPage < totalPages - 2)
                                            ) {
                                                return (
                                                    <span
                                                        key={pageNum}
                                                        className="flex items-center justify-center w-6 h-10 text-gray-400"
                                                    >
                                                    ...
                                                </span>
                                                );
                                            }
                                            return null;
                                        })}

                                        <button
                                            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                            disabled={currentPage === totalPages}
                                            className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all ${
                                                currentPage === totalPages
                                                    ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                            }`}
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-md"
                        >
                            <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F0F9FF] dark:bg-gray-700">
                                <MessageSquare className="w-8 h-8 text-[#FFC107]" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                {filteredRating > 0
                                    ? `No Testimonials with ${filteredRating} Stars`
                                    : 'No Testimonials Available'}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                                {filteredRating > 0
                                    ? `We don’t have any testimonials with ${filteredRating} stars yet. Adjust the filter or add your own experience!`
                                    : 'Be the first to share your experience with us. Your feedback matters!'}
                            </p>
                            <motion.button
                                onClick={handleAddTestimonial}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="mt-6 px-6 py-3 bg-green-400 hover:bg-green-500 text-white font-medium rounded-lg shadow-md inline-flex items-center space-x-2"
                            >
                                <PlusCircle className="w-4 h-4" />
                                <span>Add a Testimonial</span>
                            </motion.button>
                        </motion.div>
                    )}
                </div>
            </section>
        );
    });



    const Contact = memo(() => {
        const { settings } = useData();
        return (
            <section id="contact" className="py-20 bg-[#F5F5F5] dark:bg-[#1A1A1A]">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-[#1A1A1A]">CONTACTEZ-NOUS</h2>
                        <div className="h-1 w-24 bg-[#FFC107] mx-auto my-4"></div>
                        <p className="text-[#4A4A4A] dark:text-gray-300">Nous sommes à votre écoute</p>
                    </div>
    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <div className="bg-white dark:bg-[#4A4A4A] p-8 rounded-lg shadow-lg">
                            <h3 className="text-2xl font-semibold text-[#1A1A1A] mb-6">Nos coordonnées</h3>
    
                            <div className="space-y-6">
                                <div className="flex items-center">
                                    <div className="w-9 h-9 bg-[#FFC107] rounded-full flex items-center justify-center mr-4">
                                        <Phone className="w-4 h-4 text-[#1A1A1A]" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-[#4A4A4A] dark:text-gray-300 font-medium">Téléphone</p>
                                        <p className="text-[#1A1A1A] dark:text-white">+{settings.phone}</p>
                                    </div>
                                </div>
    
                                <div className="flex items-center">
                                    <div className="w-9 h-9 bg-[#4A4A4A] rounded-full flex items-center justify-center mr-4">
                                        <Mail className="w-3 h-3 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-[#4A4A4A] dark:text-gray-300 font-medium">Email</p>
                                        <p className="text-[#1A1A1A] dark:text-white">{settings.contactEmail}</p>
                                    </div>
                                </div>
    
                                <div className="flex items-center">
                                    <div className="w-9 h-9 bg-[#FFC107] rounded-full flex items-center justify-center mr-4">
                                        <MapPin className="w-4 h-4 text-[#1A1A1A]" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-[#4A4A4A] dark:text-gray-300 font-medium">Adresse</p>
                                        <p className="text-[#1A1A1A] dark:text-white">{settings.adress}</p>
                                    </div>
                                </div>
                            </div>
    
                            <div className="mt-8 pt-6 border-t border-[#4A4A4A]/20 dark:border-gray-700">
                                <h4 className="text-xl font-medium text-[#1A1A1A] mb-4">Horaires d'ouverture</h4>
                                <div className="grid grid-cols-2 gap-4 text-[#4A4A4A] dark:text-gray-300">
                                    <span className="text-[#1A1A1A] dark:text-white">Lundi - Vendredi:</span>
                                    <span>9h - 18h</span>
                                    <span className="text-[#1A1A1A] dark:text-white">Samedi:</span>
                                    <span>10h - 16h</span>
                                </div>
                            </div>
                        </div>
    
                        <div className="bg-white dark:bg-[#4A4A4A] p-2 rounded-lg shadow-lg">
                            <iframe
                                key={settings.gps}
                                title="Localisation"
                                src={settings.gps}
                                width="100%"
                                height="400"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                className="rounded-md"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>
        );
    });



    const Footer = memo(() => {
        const [clickCount, setClickCount] = useState(0);
        const { settings } = useData();
        const [openSection, setOpenSection] = useState(null);
    
        const handleClick = () => {
            setClickCount(prevCount => prevCount + 1);
        };
    
        const toggleSection = (section) => setOpenSection(openSection === section ? null : section);
    
        return (
            <footer className="bg-[#1A1A1A] text-white py-12 md:py-16 rounded-t-3xl shadow-lg border-t-4 border-[#FFC107]">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    {/* Top section with grid layout */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
                        {/* Logo and tagline section */}
                        <div className="space-y-4 flex flex-col items-center md:items-start md:text-left text-center">
                            <img
                                src={Logo}
                                alt={settings.siteName}
                                className="h-14 w-auto mb-4 filter drop-shadow-lg transition-all hover:scale-105 hover:brightness-110 duration-300 cursor-pointer"
                                onClick={handleLogoClick}
                            />
                            <p className="text-sm text-white max-w-xs font-light italic">Location de voitures avec un service d'exception</p>
                        </div>
    
                        {/* Navigation section */}
                        <div className="md:block">
                            <div
                                className="flex justify-between items-center pb-3 md:pb-0 cursor-pointer group"
                                onClick={() => toggleSection('navigation')}
                            >
                                <h4 className="font-bold text-lg text-[#FFC107] border-b-2 border-[#FFC107] pb-1">Navigation</h4>
                                <FaChevronDown
                                    className="md:hidden transform transition-transform duration-300 text-[#FFC107] group-hover:text-white"
                                    style={{ transform: openSection === 'navigation' ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                />
                            </div>
                            <ul
                                className={`${openSection === 'navigation' ? 'max-h-96 mt-4' : 'max-h-0'} md:mt-4 md:max-h-96 overflow-hidden transition-all duration-300 ease-in-out space-y-3 text-sm md:block`}
                            >
                                <li><a href="#fleet" className="text-white hover:text-[#FFC107] transition-colors duration-200 inline-block py-1 hover:translate-x-1 transform">Notre Flotte</a></li>
                                <li><a href="#features" className="text-white hover:text-[#FFC107] transition-colors duration-200 inline-block py-1 hover:translate-x-1 transform">Avantages</a></li>
                                <li><a href="#contact" className="text-white hover:text-[#FFC107] transition-colors duration-200 inline-block py-1 hover:translate-x-1 transform">Contact</a></li>
                            </ul>
                        </div>
    
                        {/* Legal section */}
                        <div className="md:block">
                            <div
                                className="flex justify-between items-center pb-3 md:pb-0 cursor-pointer group"
                                onClick={() => toggleSection('legal')}
                            >
                                <h4 className="font-bold text-lg text-[#FFC107] border-b-2 border-[#FFC107] pb-1">Légal</h4>
                                <FaChevronDown
                                    className="md:hidden transform transition-transform duration-300 text-[#FFC107] group-hover:text-white"
                                    style={{ transform: openSection === 'legal' ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                />
                            </div>
                            <ul
                                className={`${openSection === 'legal' ? 'max-h-96 mt-4' : 'max-h-0'} md:mt-4 md:max-h-96 overflow-hidden transition-all duration-300 ease-in-out space-y-3 text-sm md:block`}
                            >
                                <li>
                                    <a
                                        href="/conditions-generales"
                                        rel="noopener noreferrer"
                                        className="text-white hover:text-[#FFC107] transition-colors duration-200 inline-block py-1 hover:translate-x-1 transform"
                                    >
                                        Conditions générales
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/politique-de-confidentialite"
                                        rel="noopener noreferrer"
                                        className="text-white hover:text-[#FFC107] transition-colors duration-200 inline-block py-1 hover:translate-x-1 transform"
                                    >
                                        Politique
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/mentions-legales"
                                        rel="noopener noreferrer"
                                        className="text-white hover:text-[#FFC107] transition-colors duration-200 inline-block py-1 hover:translate-x-1 transform"
                                    >
                                        Mentions légales
                                    </a>
                                </li>
                            </ul>
                        </div>
    
                        {/* Social media section */}
                        <div className="md:block">
                            <div
                                className="flex justify-between items-center pb-3 md:pb-0 cursor-pointer group"
                                onClick={() => toggleSection('social')}
                            >
                                <h4 className="font-bold text-lg text-[#FFC107] border-b-2 border-[#FFC107] pb-1">Réseaux sociaux</h4>
                                <FaChevronDown
                                    className="md:hidden transform transition-transform duration-300 text-[#FFC107] group-hover:text-white"
                                    style={{ transform: openSection === 'social' ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                />
                            </div>
                            <div
                                className={`${openSection === 'social' ? 'max-h-96 mt-4' : 'max-h-0'} md:mt-4 md:max-h-96 overflow-hidden transition-all duration-300 ease-in-out flex justify-center md:justify-start space-x-4`}
                            >
                                <a href={`https://wa.me/${settings.phone}`} className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center hover:bg-[#FFC107] transition-all duration-300 transform hover:scale-110">
                                    <FaWhatsapp className="w-5 h-5 text-white" />
                                </a>
                                <a href={`mailto:${settings.contactEmail}`} className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center hover:bg-[#FFC107] transition-all duration-300 transform hover:scale-110">
                                    <Mail className="w-5 h-5 text-white" />
                                </a>
                                <a href={settings.facebook} className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-[#FFC107] transition-all duration-300 transform hover:scale-110">
                                    <FaFacebook className="w-5 h-5 text-white" />
                                </a>
                                <a href={settings.instagram} className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center hover:bg-[#FFC107] transition-all duration-300 transform hover:scale-110">
                                    <FaInstagram className="w-5 h-5 text-white" />
                                </a>
                            </div>
                        </div>
                    </div>
    
                    {/* Decorative divider */}
                    <div className="mt-10">
                        <div className="h-px bg-gradient-to-r from-transparent via-[#FFC107] to-transparent"></div>
                    </div>
    
                    {/* Bottom copyright section */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-white">
                            <span onClick={handleClick} style={{ cursor: 'pointer' }} className="hover:text-[#FFC107] transition-colors">©</span> {new Date().getFullYear()} {settings.siteName}. Tous droits réservés.
                        </p>
                    </div>
                </div>
            </footer>
        );
    });
    const FloatingWhatsAppButton = memo(() => {
        let phone = settings.phone || "";
        // Optionally prepend country code if missing (e.g., for US)
        if (!phone.startsWith("+") && !phone.match(/^\d{11,}/)) {
            phone = "+1" + phone; // Adjust country code as needed
        }
        const cleanPhone = phone.replace(/\D/g, '');
        const whatsappUrl = `https://wa.me/${cleanPhone}`;

        return (
            <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-8 right-8 p-4 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors z-50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <FaWhatsapp className="w-6 h-6" />
            </motion.a>
        );
    });

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
            <Header />
            <Hero />
            <Fleet />
            <Features />
            <Testimonials />
            <Contact settings={settings} />
            <Footer settings={settings} handleLogoClick={handleLogoClick} />
            <FloatingWhatsAppButton />
        </div>
    );
};

export default Main;