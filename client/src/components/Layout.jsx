import { motion } from "framer-motion";

function Layout({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-slate-900 text-white min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        {children}
      </div>
    </motion.div>
  );
}

export default Layout;