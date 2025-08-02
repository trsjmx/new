//Eng. Arwa Ghilan
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import {
  Search, Users, TrendingUp, MapPin, Lightbulb, Heart, MessageCircle, 
  Star, Filter, Plus, Eye, Award, Mic, Camera, Palette,
  X, Pause, Volume2, Send, ThumbsUp, Share2, Clock, Zap, User, Check
} from 'lucide-react';

function ModelViewer({ modelPath }) {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} />;
}

function App() {
  
  const projects = [
    {
      id: 1,
      title: "الحديقة المركزية الذكية ",
      author: "أحمد المالكي",
      implementingEntity: "أمانة منطقة عسير",
      progress: 35,
      date: "منذ 3 أيام",
      likes: 47,
      image: "image01.jpeg" 
    },
    {
      id: 2,
      title: "نظام النقل الكهربائي",
      author: "فاطمة الشهري",
      implementingEntity: "أمانة منطقة عسير",
      progress: 60,
      date: "منذ أسبوع",
      likes: 32,
      image: "image02.webp"
    },
    {
      id: 3,
      title: "مركز الابتكار التقني",
      author: "محمد العسيري",
      implementingEntity: "أمانة منطقة عسير",
      progress: 15,
      date: "منذ يومين",
      likes: 28,
      image: "image03.jpg"
    }
  ];

  const [ideas, setIdeas] = useState([
    {
      id: 1,
      text: "إنشاء حديقة مركزية ذكية في وسط أبها مع تقنيات الري الذكي ومسارات للمشي والدراجات",
      author: "أحمد المالكي",
      category: "البيئة والاستدامة",
      votes: 47,
      comments: 12,
      district: "أبها",
      timestamp: "منذ 3 ساعات",
      featured: true
    },
    {
      id: 2,
      text: "تطوير نظام نقل عام كهربائي يربط بين المدن والقرى في منطقة عسير",
      author: "فاطمة الشهري",
      category: "النقل والمواصلات",
      votes: 32,
      comments: 8,
      district: "خميس مشيط",
      timestamp: "منذ 5 ساعات",
      featured: false
    },
  
    {
      id: 3,
      text: "مركز للابتكار التقني والإبداع المجتمعي  مصمم بشكل دائري هندسي حديث، يُحاكي مفاهيم الانفتاح والحركة والانسيابية. يتوسطه قبة زجاجية شفافة تتيح دخول الضوء الطبيعي وتمنح شعورًا بالرحابة والارتباط بالبيئة المحيطة، مستوحاة من التضاريس الجبلية والمناخ المعتدل لأبها",
      author: "  أروى غيلان",
      category: " التكنولوجيا والابتكار",
      votes: 0,
      comments: 0,
      district: "أبها",
      timestamp: "الآن",
      featured: false,
      isDream: true,
      dreamType: "transportation",
      dreamMode: "voice",
      modelPath: "/models/a_park_structure.glb"
    }
  ]);

  const [newsItems, setNewsItems] = useState([
    {
      id: 1,
      title: "بدء تنفيذ مشروع الحديقة المركزية في أبها",
      author: "أحمد المالكي",
      status: "قيد التنفيذ",
      progress: 35,
      date: "منذ 3 أيام"
    },
    {
      id: 2, 
      title: "دراسة جدوى لمشروع النقل الكهربائي",
      author: "فاطمة الشهري",
      status: "قيد الدراسة",
      progress: 60,
      date: "منذ أسبوع"
    },
    {
      id: 3,
      title: "موافقة مبدئية على مركز الابتكار التقني",
      author: "محمد العسيري",
      status: "معتمد",
      progress: 15,
      date: "منذ يومين"
    }
  ]);

  const [ideaInput, setIdeaInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("الكل");
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [sortBy, setSortBy] = useState("الأحدث");
  const [showDreamStudio, setShowDreamStudio] = useState(false);
  const [dreamType, setDreamType] = useState("");
  const [specificLocation, setSpecificLocation] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [voiceDescription, setVoiceDescription] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [dreamMode, setDreamMode] = useState("voice");
  const [showVisualization, setShowVisualization] = useState(false);
  const [viewingModel, setViewingModel] = useState(null);

  const categories = [
    "البيئة والاستدامة",
    "النقل والمواصلات", 
    "التكنولوجيا والابتكار",
    "الثقافة والتراث",
    "الصحة والتعليم",
    "التجارة والاقتصاد",
    "السياحة والترفيه"
  ];

  const districts = [
    "أبها", "خميس مشيط", "بيشة", "النماص", "تنومة", "سراة عبيدة", "رجال ألمع", "محايل عسير"
  ];

  const specificAreas = {
    "أبها": ["حي الراقي", "حي المنهل", "حي الخالدية", "حي الأندلس", "حي الموظفين", "حي السلام", "وسط البلد"],
    "خميس مشيط": ["حي الفيصلية", "حي الخضراء", "حي التعاون", "حي الصناعية", "حي الأسكان", "حي الزهراء"],
    "بيشة": ["حي الشفاء", "حي الملك فهد", "حي الأمير سعود", "حي العزيزية", "حي النور"],
    "النماص": ["حي الثلوج", "حي الضباب", "حي الورود", "حي الصيف", "حي الطائف"],
    "تنومة": ["حي الجنادرية", "حي الصدر", "حي الحكير", "حي الصفاء"],
    "سراة عبيدة": ["حي المنتزه", "حي الربيع", "حي الشلال", "حي الأطلال"],
    "رجال ألمع": ["حي التراث", "حي الألوان", "حي الحرف", "حي الأسواق"],
    "محايل عسير": ["حي العروس", "حي الأمير فيصل", "حي الورود", "حي الخليج"]
  };

  const dreamTypes = [
    { 
      id: "park", 
      name: "حديقة أو متنزه", 
      icon: "🌳", 
      prompt: "صف لي كيف تتخيل الحديقة المثالية في منطقتك..."
    },
    { 
      id: "transportation", 
      name: "طريق أو وسيلة نقل", 
      icon: "🚗", 
      prompt: "كيف يمكن تحسين النقل والمواصلات في هذه المنطقة..."
    },
    { 
      id: "housing", 
      name: "مسكن أو حي سكني", 
      icon: "🏠", 
      prompt: "كيف تريد أن يكون الحي السكني المثالي هنا..."
    },
    { 
      id: "commercial", 
      name: "مركز تجاري أو سوق", 
      icon: "🏪", 
      prompt: "صف لي السوق أو المركز التجاري الذي تحلم به..."
    },
    { 
      id: "cultural", 
      name: "مركز ثقافي أو متحف", 
      icon: "🏛️", 
      prompt: "كيف تتخيل المكان الثقافي المناسب لتراث المنطقة..."
    },
    { 
      id: "sports", 
      name: "مرافق رياضية أو ترفيهية", 
      icon: "⚽", 
      prompt: "ما هي المرافق الرياضية التي تحتاجها المنطقة..."
    }
  ];

  // Timer for recording
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
  };

  const stopRecording = () => {
    setIsRecording(false);
    const simulatedTranscription = `أريد ${dreamTypes.find(d => d.id === dreamType)?.name} في ${specificLocation} بمنطقة ${selectedArea}. أتخيل مكاناً جميلاً يجمع بين الحداثة والتراث، مع مساحات خضراء واسعة ومرافق متطورة تخدم جميع أفراد المجتمع. المكان يجب أن يكون مناسباً للعائلات والأطفال، مع أماكن للجلوس والاسترخاء، وربما مقاهي شعبية تقدم القهوة العربية والحلويات التراثية. كما أتمنى أن يكون هناك مساحات للأنشطة المختلفة مثل الرياضة والقراءة والفعاليات الثقافية.`;
    setVoiceDescription(simulatedTranscription);
    setShowVisualization(true);
  };

  const submitDream = () => {
    if (voiceDescription.trim() !== "" && dreamType && selectedArea && specificLocation) {
      const dreamIdea = {
        id: ideas.length + 1,
        text: voiceDescription,
        author: authorName || "مواطن من عسير",
        category: dreamTypes.find(d => d.id === dreamType)?.name || "فكرة عامة",
        votes: 0,
        comments: 0,
        district: selectedArea,
        specificLocation: specificLocation,
        timestamp: "الآن",
        featured: false,
        isDream: true,
        dreamType: dreamType,
        dreamMode: dreamMode,
        modelPath: `/${dreamType}_model.glb`
      };
      setIdeas([dreamIdea, ...ideas]);
      
      setVoiceDescription("");
      setDreamType("");
      setSelectedArea("");
      setSpecificLocation("");
      setShowDreamStudio(false);
      setDreamMode("voice");
      setShowVisualization(false);
    }
  };

  const submitIdea = () => {
    if (ideaInput.trim() !== "" && selectedCategory && selectedDistrict && authorName.trim() !== "") {
      const newIdea = {
        id: ideas.length + 1,
        text: ideaInput,
        author: authorName,
        category: selectedCategory,
        votes: 0,
        comments: 0,
        district: selectedDistrict,
        timestamp: "الآن",
        featured: false
      };
      setIdeas([newIdea, ...ideas]);
      setIdeaInput("");
      setSelectedCategory("");
      setSelectedDistrict("");
      setAuthorName("");
      setShowSubmitForm(false);
    }
  };

  const upvote = (id) => {
    setIdeas(ideas.map(idea => 
      idea.id === id ? { ...idea, votes: idea.votes + 1 } : idea
    ));
  };

  const filteredIdeas = ideas.filter(idea => {
    const matchesCategory = filterCategory === "الكل" || idea.category === filterCategory;
    const matchesSearch = idea.text.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         idea.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedIdeas = [...filteredIdeas].sort((a, b) => {
    if (sortBy === "الأكثر تصويتاً") return b.votes - a.votes;
    if (sortBy === "الأكثر تفاعلاً") return b.comments - a.comments;
    return 0;
  });

  const viewModel = (modelPath) => {
    setViewingModel(modelPath);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* 3D Model Viewer Modal */}
      <AnimatePresence>
        {viewingModel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setViewingModel(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-4xl h-[80vh] bg-gray-900 rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setViewingModel(null)}
                className="absolute top-4 right-4 z-50 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
              
              <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />
                <ModelViewer modelPath={viewingModel} />
                <OrbitControls />
              </Canvas>
              
              <div className="absolute bottom-4 left-0 right-0 text-center text-white/80 text-sm">
                استخدم الماوس لتدوير النموذج وتكبير/تصغير الصورة
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                <img
                src="/logo6.png"
                alt="Logo"
              />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                تصوّر عسير 
                </h1>
                <p className="text-gray-600 text-sm">منصة التخطيط التشاركي لمستقبل عسير</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>{ideas.length} فكرة</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <TrendingUp className="w-4 h-4" />
                <span>{ideas.reduce((sum, idea) => sum + idea.votes, 0)} تصويت</span>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-100"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-8">
            شارك في بناء مستقبل
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> عسير</span>
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            منصة تعاونية تعتمد على الذكاء الاصطناعي والواقع الافتراضي لتمكين المواطنين والمصممين من تصميم الأحياء والمدن وفق احتياجاتهم ورؤيتهم لعسير 2030
          </p>
          
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDreamStudio(!showDreamStudio)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-5"
            >
              <Mic className="w-5 h-5" />
              الحلم الرقمي
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSubmitForm(!showSubmitForm)}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-5"
            >
              <Plus className="w-5 h-5" />
              شارك فكرتك
            </motion.button>
          </div>
        </motion.div>

{/* Regular Submit Form */}
        <AnimatePresence>
          {showSubmitForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 mb-8 border border-white/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">شارك فكرتك</h3>
                  <p className="text-gray-600">ساهم في بناء مستقبل عسير بأفكارك المبدعة</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">اسمك</label>
                  <input
                    type="text"
                    placeholder="أدخل اسمك"
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">المدينة</label>
                  <select
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                  >
                    <option value="">اختر المدينة</option>
                    {districts.map(district => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">الفئة</label>
                <select
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">اختر الفئة</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">وصف الفكرة</label>
                <textarea
                  placeholder="اكتب فكرتك بالتفصيل..."
                  rows={4}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                  value={ideaInput}
                  onChange={(e) => setIdeaInput(e.target.value)}
                />
              </div>
             
               <p className="text-gray-600 mb-6">
                *بمشاركة فكرتك في منصة تصور عسير، فإنك توافق على انتقال ملكيتها بالكامل للجهة المنفذة، ولا يحق لك بعد ذلك المطالبة بأي حقوق مالية أو معنوية عليها.
               </p>
              
              <div className="flex gap-4 justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowSubmitForm(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                >
                  إلغاء
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={submitIdea}
                  disabled={!ideaInput.trim() || !selectedCategory || !selectedDistrict || !authorName.trim()}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  إرسال الفكرة
                </motion.button>
              </div>
            </motion.div>

          )}
        </AnimatePresence>
        

        <section className="py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 dir="rtl" className="text-3xl font-bold text-gray-800">أفكار <span className="bg-gradient-to-r from-emerald-600  to-teal-600 bg-clip-text text-transparent"> مميزة</span>   قيد التنفيذ
              </h2>
              <div className="flex items-center gap-4">
                <button className="p-2 rounded-full bg-white/80 backdrop-blur-md shadow-md hover:bg-emerald-50 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button className="p-2 rounded-full bg-white/80 backdrop-blur-md shadow-md hover:bg-emerald-50 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
               <div key={project.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={`/${project.image}`} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = '/images/default-project.jpg';
                      }}
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{project.title}</h3>
                      <span className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        {project.date}
                      </span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600 mb-4">
                      <User className="w-4 h-4 mr-1" />
                      <span> {project.author}</span>
                    </div>
                   <div className="flex items-center text-emerald-600">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        <span>{project.implementingEntity}</span>
                      </div>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>حالة التنفيذ</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                      <button className="text-emerald-600 hover:text-emerald-800 font-medium">
                        التفاصيل
                      </button>
                      <div className="flex items-center text-gray-500">
                        <Heart className="w-5 h-5 mr-1" />
                        <span>{project.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Dream Studio */}
        <AnimatePresence>
          {showDreamStudio && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-center flex-1">
                      <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mic className="w-10 h-10 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-800 mb-2">استديو الحلم الرقمي</h2>
                      <p className="text-gray-600">حول حلمك إلى تصميم حقيقي لمنطقتك</p>
                    </div>
                    <button
                      onClick={() => setShowDreamStudio(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Step 1: Choose Area */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">1. اختر المنطقة المحددة</h3>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <select
                        className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        value={selectedArea}
                        onChange={(e) => {
                          setSelectedArea(e.target.value);
                          setSpecificLocation("");
                        }}
                      >
                        <option value="">اختر المدينة</option>
                        {districts.map(district => (
                          <option key={district} value={district}>{district}</option>
                        ))}
                      </select>
                      
                      {selectedArea && (
                        <select
                          className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                          value={specificLocation}
                          onChange={(e) => setSpecificLocation(e.target.value)}
                        >
                          <option value="">اختر الحي أو المنطقة المحددة</option>
                          {specificAreas[selectedArea]?.map(area => (
                            <option key={area} value={area}>{area}</option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>


                  {/* Step 2: Choose Dream Type */}
                  {selectedArea && specificLocation && (
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">2. ما الذي تريد تصميمه؟</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        {dreamTypes.map(type => (
                          <motion.button
                            key={type.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setDreamType(type.id)}
                            className={`p-6 rounded-xl border-2 transition-all ${
                              dreamType === type.id 
                                ? 'border-purple-500 bg-purple-50' 
                                : 'border-gray-200 hover:border-purple-300'
                            }`}
                          >
                            <div className="text-3xl mb-2">{type.icon}</div>
                            <div className="font-semibold text-gray-800">{type.name}</div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 3: Choose Input Method */}
                  {dreamType && (
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">3. كيف تريد أن تشارك حلمك؟</h3>
                      <div className="grid md:grid-cols-3 gap-4 mb-6">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setDreamMode("voice")}
                          className={`p-6 rounded-xl border-2 transition-all ${
                            dreamMode === "voice" 
                              ? 'border-purple-500 bg-purple-50' 
                              : 'border-gray-200 hover:border-purple-300'
                          }`}
                        >
                          <Mic className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                          <div className="font-semibold">تسجيل صوتي</div>
                          <div className="text-sm text-gray-600">صف حلمك بصوتك</div>
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setDreamMode("draw")}
                          className={`p-6 rounded-xl border-2 transition-all ${
                            dreamMode === "draw" 
                              ? 'border-purple-500 bg-purple-50' 
                              : 'border-gray-200 hover:border-purple-300'
                          }`}
                        >
                          <Palette className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                          <div className="font-semibold">رسم تخطيطي</div>
                          <div className="text-sm text-gray-600">ارسم فكرتك بنفسك</div>
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setDreamMode("photo")}
                          className={`p-6 rounded-xl border-2 transition-all ${
                            dreamMode === "photo" 
                              ? 'border-purple-500 bg-purple-50' 
                              : 'border-gray-200 hover:border-purple-300'
                          }`}
                        >
                          <Camera className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                          <div className="font-semibold">صورة مرجعية</div>
                          <div className="text-sm text-gray-600">اختر صورة مشابهة</div>
                        </motion.button>
                      </div>

                      {/* Voice Recording Interface */}
                      {dreamMode === "voice" && (
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                          <div className="text-center mb-6">
                            <div className="relative">
                              <div className="w-32 h-32 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <div className="text-5xl">🎙️</div>
                              </div>
                              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-lg">
                                ✨
                              </div>
                            </div>
                            <p className="text-lg font-semibold text-gray-800 mb-2">
                              {dreamTypes.find(d => d.id === dreamType)?.prompt}
                            </p>
                            <p className="text-sm text-gray-600 mb-4">
                              في {specificLocation} - {selectedArea}
                            </p>
                            <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg p-3 mb-4">
                              <p className="text-sm font-medium text-amber-800">
                                💡 نصائح للحصول على أفضل النتائج:
                              </p>
                              <ul className="text-xs text-amber-700 mt-2 space-y-1">
                                <li>• تحدث بوضوح واصف التفاصيل</li>
                                <li>• اذكر الألوان والمساحات والخدمات</li>
                                <li>• تخيل كيف سيستخدم الناس هذا المكان</li>
                              </ul>
                            </div>
                          </div>
                          
                          <div className="text-center mb-6">
                            {!isRecording ? (
                              <div>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={startRecording}
                                  className="w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all relative"
                                >
                                  <Mic className="w-10 h-10" />
                                  <div className="absolute inset-0 rounded-full bg-white/20 animate-ping"></div>
                                </motion.button>
                                <p className="text-lg font-bold text-purple-600 mt-4">ابدأ بتسجيل حلمك</p>
                                <p className="text-sm text-gray-600">اضغط واصف مكانك المثالي</p>
                              </div>
                            ) : (
                              <div>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={stopRecording}
                                  className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all animate-pulse relative"
                                >
                                  <Pause className="w-10 h-10" />
                                  <div className="absolute inset-0 rounded-full bg-red-400 animate-pulse"></div>
                                </motion.button>
                                <div className="mt-4">
                                  <p className="text-2xl font-bold text-red-600">
                                    {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}
                                  </p>
                                  <p className="text-sm text-gray-600">🎵 جاري التسجيل... تحدث بحرية</p>
                                  <div className="flex justify-center mt-2">
                                    <div className="flex space-x-1">
                                      <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
                                      <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                      <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          
                          {voiceDescription && (
                            <div className="space-y-4">
                              <div className="bg-white rounded-xl p-4 border border-purple-200">
                                <div className="flex items-center gap-2 mb-3">
                                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                                    <Volume2 className="w-4 h-4 text-white" />
                                  </div>
                                  <span className="font-semibold text-gray-800">تم تحويل صوتك إلى نص:</span>
                                </div>
                                <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">{voiceDescription}</p>
                              </div>
                              
                              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-3">
                                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                                    <span className="text-white text-sm">🤖</span>
                                  </div>
                                  <span className="font-semibold text-gray-800">الذكاء الاصطناعي يحلل حلمك:</span>
                                </div>
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                                    <span className="text-sm text-gray700">تم تحديد المكان: {selectedArea} - {specificLocation}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                                    <span className="text-sm text-gray-700">نوع المشروع: {dreamTypes.find(d => d.id === dreamType)?.name}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse"></div>
                                    <span className="text-sm text-gray-700">جاري تحليل المتطلبات والاحتياجات...</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse"></div>
                                    <span className="text-sm text-gray-700">إنشاء تصميم مبدئي بناءً على وصفك...</span>
                                  </div>
                                </div>
                              </div>
                              
                              {showVisualization && (
                                <motion.button
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => viewModel(`/${dreamType}_model.glb`)}
                                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                                >
                                  <Eye className="w-5 h-5" />
                                  عرض التصميم الثلاثي الأبعاد
                                </motion.button>
                              )}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Drawing Interface */}
                      {dreamMode === "draw" && (
                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6">
                          <div className="text-center mb-6">
                            <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full mx-auto mb-4 flex items-center justify-center text-5xl">
                              🎨
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">ارسم تصورك</h3>
                            <p className="text-gray-600">استخدم الأدوات أدناه لرسم مخطط بسيط لفكرتك</p>
                          </div>
                          
                          <div className="bg-white rounded-xl p-4 border-2 border-dashed border-gray-300 min-h-[300px] flex items-center justify-center">
                            <div className="text-center text-gray-500">
                              <Palette className="w-16 h-16 mx-auto mb-4 opacity-50" />
                              <p>منطقة الرسم - قريباً</p>
                              <p className="text-sm">ستتمكن من الرسم مباشرة هنا</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Photo Upload Interface */}
                      {dreamMode === "photo" && (
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                          <div className="text-center mb-6">
                            <div className="w-32 h-32 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full mx-auto mb-4 flex items-center justify-center text-5xl">
                              📸
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">شارك صورة مرجعية</h3>
                            <p className="text-gray-600">اختر صورة تشبه ما تتخيله لمنطقتك</p>
                          </div>
                          
                          <div className="bg-white rounded-xl p-8 border-2 border-dashed border-gray-300 min-h-[200px] flex items-center justify-center">
                            <div className="text-center text-gray-500">
                              <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                              <p>اسحب الصورة هنا أو انقر للاختيار</p>
                              <p className="text-sm">يدعم: JPG, PNG, GIF</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Submit Button */}
                  <p className="text-gray-600 mb-6">
                *بمشاركة فكرتك في منصة تصور عسير، فإنك توافق على انتقال ملكيتها بالكامل للجهة المنفذة، ولا يحق لك بعد ذلك المطالبة بأي حقوق مالية أو معنوية عليها.
               </p>
              
                  {voiceDescription && dreamType && selectedArea && specificLocation && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-4 justify-end"
                    >
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowDreamStudio(false)}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                      >
                        إلغاء
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={submitDream}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                      >
                        <Send className="w-5 h-5" />
                        إرسال الحلم للمجتمع
                      </motion.button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        

        {/* Search and Filter */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 mb-8 border border-white/20">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="ابحث في الأفكار..."
                className="w-full pr-12 pl-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-600" />
                <select
                  className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <option value="الكل">كل الفئات</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <select
                className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="الأحدث">الأحدث</option>
                <option value="الأكثر تصويتاً">الأكثر تصويتاً</option>
                <option value="الأكثر تفاعلاً">الأكثر تفاعلاً</option>
              </select>
            </div>
          </div>
        </div>

        {/* Ideas Grid */}
        <div className="grid gap-6">
          <AnimatePresence>
            {sortedIdeas.map((idea, index) => (
              <motion.div
                key={idea.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 border transition-all hover:shadow-2xl ${
                  idea.featured 
                    ? 'border-gradient-to-r from-yellow-400 to-orange-400 ring-2 ring-yellow-400/20' 
                    : 'border-white/20 hover:border-emerald-200'
                } ${idea.isDream ? 'bg-gradient-to-r from-purple-50 to-pink-50' : ''}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {idea.isDream && (
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-sm">
                        🎙️
                      </div>
                    )}
                    {idea.featured && (
                      <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        <Award className="w-4 h-4" />
                        مميزة
                      </div>
                    )}
                    <span className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {idea.category}
                    </span>
                    {idea.isDream && (
                      <span className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                        حلم رقمي
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>{idea.district}</span>
                    {idea.specificLocation && (
                      <span>- {idea.specificLocation}</span>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-800 text-lg leading-relaxed mb-6">{idea.text}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => upvote(idea.id)}
                      className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
                    >
                      <ThumbsUp className="w-5 h-5" />
                      <span>{idea.votes}</span>
                    </motion.button>
                    
                    <div className="flex items-center gap-2 text-gray-600">
                      <MessageCircle className="w-5 h-5" />
                      <span>{idea.comments}</span>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors"
                    >
                      <Share2 className="w-5 h-5" />
                      <span>مشاركة</span>
                    </motion.button>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{idea.timestamp}</span>
                    </div>
                    <span>بواسطة {idea.author}</span>
                  </div>
                </div>
                
                {idea.isDream && (
                  <div className="mt-4 pt-4 border-t border-purple-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-purple-600">
                        <Zap className="w-4 h-4" />
                        <span>تم إنشاؤها باستخدام الذكاء الاصطناعي</span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => viewModel(idea.modelPath)}
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 text-sm"
                      >
                        <Eye className="w-4 h-4" />
                        عرض النموذج ثلاثي الأبعاد
                      </motion.button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {sortedIdeas.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-32 h-32 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Lightbulb className="w-16 h-16 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">لم يتم العثور على أفكار</h3>
            <p className="text-gray-600 mb-8">جرب تغيير كلمات البحث أو الفلاتر، أو كن أول من يشارك فكرة في هذه الفئة</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSubmitForm(true)}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              اقترح فكرة جديدة
            </motion.button>
          </motion.div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              
                <img
                src="/logo6.png"
                alt="Logo"
                className=" w-10 h-10 rounded-xl object-cover"
              />
             
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                تصور عسير 
              </span>
            </div>
            <p className="text-gray-600 mb-4">منصة التخطيط التشاركي لمستقبل منطقة عسير</p>
            <div className="flex justify-center gap-8 text-sm text-gray-500">
              <span>© تصور عسير</span>
              <span>•</span>
              <span>جميع الحقوق محفوظة</span>
              <span>•</span>
              <span>مدعوم بالذكاء الاصطناعي</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;