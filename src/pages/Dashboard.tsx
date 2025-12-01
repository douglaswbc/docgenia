import React from 'react';
import { Link } from 'react-router-dom';
import { Specialty } from '../types';

const specialties: Specialty[] = [
  {
    id: 'law',
    name: 'Direito Civil',
    description: 'Gere petições, contratos e pareceres jurídicos.',
    icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMmWdAoE14NDOygoSs3u-yDaLWpvaNl6RxY7E1WSHuWNjbvUDNAHhDBg7ykbCadqXzCayMdYHJUxfpQOB82F2dFOE8WjwzO7XsdEAf0iifjxUhz1M2w0vwQTJMWyEpHAs9vVG30VTx2e8U-NNyZfEprUehNY2awqD2oIMlAYH7F8qOogXnfObnndXFuyxIPcxEIqy_UINbkxijIhsObYGOqrDi235mmhi9nXxAr_3Ju8xyuRA2-r-2qwzU9iOwRh8bChJBxa2aigU',
    path: '/specialties/law'
  },
  {
    id: 'marketing',
    name: 'Marketing Digital',
    description: 'Crie planos de campanha, posts e emails.',
    icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATrovUcOQpbqCaU9D010NuIRTgZCXGYw97z2p3L59DPXMmRfTNH6Alu3jKs_HovHK_0QoBFPUNePJCbleHEo-RzjMqSjXQg9TvRG7uUrCHJ8fATDuBaWkTC5xC5TkVkH_0wpmT1QJYMf0hVClsZcApjb5WWjMBxJCVRZYXeHi8Fcj5p0_II6HxJ5Z4AuPZyekvAfTVpvHdoQfHhr-ntAbGu1Vh34hgWAYZMQT-6ivWrlFYtMML9xQMacSuG6V8ilQRoIU4GB-a8M4',
    path: '/specialties/marketing'
  },
  {
    id: 'software',
    name: 'Engenharia de Software',
    description: 'Elabore documentação técnica e relatórios.',
    icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuAVFJuVUN58gIrhiclCoSbrY27c5KakFAKdYeRG0G14iA-kW8cUcwh7Mv-50vd2Yp9TsCUhBjyMf1yGV7KuatyNCjaMjuiHRH-W6zKRdNYUfkOwcCnz6Hg1jwtRQd9OqnJItoZGOM3nPoHPDwi72x4txIbCqnfW9CbY92PXm993lUalYBKTk3fhs-d3muik7hIz8-xkpG-nnx2zhOtjXbGpZgIffH7ndDpIUI3R4K-cveFbrPWQeEGsKmpDKmGWhk5PE4f9LMHJ8',
    path: '/specialties/software'
  },
  {
    id: 'hr',
    name: 'Recursos Humanos',
    description: 'Produza descrições de cargo e políticas.',
    icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlEtvsK8tTV0UQwpqyUMFf94-UnwJLTw2J8lxf55BEThcew_Dn9ni4ziTTLRPAqRl_WJhmSNSXDoYE7Fe8Woh_kAx2l1JY9ctz0Tcqi6Sb7tDosbwc_o8Dos6yEMhISH_1ntvqq8XUTCc5xNZl-ILwbewj9T8r9UETJPLSJOlhR9M4qoBHz501OI9ACWiz0lXDfwqSj7or4wvbSBpLzpRxjiMjO-YvGrIY81AAiVoakRgac6Uck3aOOb75ug4G18R1E8r7GN8qn9A',
    path: '/specialties/hr'
  },
  {
    id: 'medical',
    name: 'Medicina Clínica',
    description: 'Redija relatórios médicos e artigos.',
    icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQK8HbmTmykA7NmaXlThAAxPhdxJaz36UXk9HD9NPPnQF4-qfVTcrbOAmwseyKH3qhMjjR_JiOFdY_jByQZoVeyIiRbeZ7SM1NnXM0UVKCGJndTFfAp7i7KF41b24MliAn_dhmpawhouu7FpgkQHEBnixlzWDuxBGTiUCSrluoqciC_gLPqOKPNN7OnXFIgB1YEe8EJIzsiCvQwus0Xk98m3IEaosh7tCmowfXTV5BKxlVTVHqVPbI0pZOJyjMZz4UulyWh8SvgmQ',
    path: '/specialties/medical'
  },
  {
    id: 'finance',
    name: 'Finanças Corporativas',
    description: 'Desenvolva análises e relatórios financeiros.',
    icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBBSVtEOTH2PnvmtHWzpef1S7Ag20u0pgkMAzwXGnjV4GjXhdjMZxr_POPzaeHJp75gTgM243Jf31xZW8_eQJwhtv6lvt9AMnWt-1DKYgygXJbSg71ciohk_lNCrCMANH44iEkXF-AdBeRE4pxB9qWh_WUsN-9ZUSbJ9Vhqex91K_ZB5mZqJbns3N37paab4oTbJq1eQlsoyQos3Xt5kbAfMzie-egfzvMZz9uVIkez6lE-dvA9zb8RUQzEHIIswUIFfDhI27hhlI',
    path: '/specialties/finance'
  }
];

const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-full min-h-full">
      <div className="w-full max-w-[1280px] px-4 md:px-10 py-5">
        <div className="flex flex-wrap items-end justify-between gap-4 py-6 md:py-10">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em] text-gray-900 dark:text-white">Painel de Controle</h1>
            <p className="text-base font-normal leading-normal text-gray-500 dark:text-gray-400">Selecione uma especialidade para começar a criar seus documentos.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialties.map((specialty) => (
            <Link 
              key={specialty.id}
              to={specialty.path}
              className="group flex cursor-pointer flex-col gap-3 rounded-xl bg-white dark:bg-card-dark p-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 border border-gray-100 dark:border-gray-800"
            >
              <div 
                className="aspect-square w-full rounded-lg bg-cover bg-center bg-no-repeat" 
                style={{ backgroundImage: `url('${specialty.icon}')` }}
              ></div>
              <div>
                <p className="text-lg font-bold leading-normal text-gray-900 dark:text-white group-hover:text-primary transition-colors">{specialty.name}</p>
                <p className="text-sm font-normal leading-normal text-gray-500 dark:text-gray-400">{specialty.description}</p>
              </div>
            </Link>
          ))}
        </div>
        
        <footer className="mt-12 flex flex-col gap-6 py-10 text-center border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col flex-wrap items-center justify-center gap-6 text-sm sm:flex-row">
            <a className="min-w-40 text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary" href="#">Termos de Uso</a>
            <a className="min-w-40 text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary" href="#">Política de Privacidade</a>
            <a className="min-w-40 text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary" href="#">Contato</a>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">© 2024 DocGen IA. Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
