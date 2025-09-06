
type formSectionProp = {
  tituloSecao: String;
  icon: React.ReactNode;
  children: React.ReactNode;
};

export default function formSection({tituloSecao, icon, children}:formSectionProp){


       <div className="mb-8">
            <div className="flex items-center gap-3 border-b dark:border-gray-700 pb-2 mb-4">
              
                {icon}

              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">{tituloSecao}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div className="md:col-span-2">
 
                    {children}

                </div>
            </div>
          </div>





}