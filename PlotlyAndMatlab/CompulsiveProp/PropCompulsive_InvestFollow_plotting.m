

InvestSigmaLow =  loadjson('Compulsive_InvestSigmaLow_relativeLoss_v1.json');
InvestSigmaHigh =  loadjson('Compulsive_InvestSigmaMedium_relativeLoss_v1.json');

%% Plotting for follower
hold on;
h=figure;
colormap summer
fig1=surf(parameters.LAMBDA3d,parameters.GAMMA3d, transpose(reshape(InvestSigmaHigh.eps01_follow,[parameters.n,parameters.n])),'LineWidth',LineWidthCustom,'EdgeColor',EdgeColor.u)
set(fig1,'facealpha',0.8)
freezeColors
hold on;
colormap parula(5)
fig2=surf(parameters.LAMBDA3d,parameters.GAMMA3d, transpose(reshape(InvestSigmaLow.eps01_follow,[parameters.n,parameters.n])),'LineWidth',LineWidthCustom,'EdgeColor',EdgeColor.l)
set(fig2,'facealpha',0.8)
freezeColors
%set(gca,'fontsize',Fs,'zlim', [27,32])      
%set(gca,'XTickLabel',{[linspace(min(parameters.GAMMA3d(:)),max(parameters.GAMMA3d(:)),3)]});
%set(gca,'YTickLabel',[linspace(min(parameters.LAMBDA3d(:)),max(parameters.LAMBDA3d(:)),3)]);

xlim([linspace(min(parameters.LAMBDA3d_high(:)),max(parameters.LAMBDA3d_high(:)),2)])
ylim([linspace(min(parameters.GAMMA3d(:)),max(parameters.GAMMA3d(:)),2)])

yLine = [linspace(min(parameters.GAMMA3d(:)),max(parameters.GAMMA3d(:)),3)]
xLine = [linspace(0,1,3)]
set(gca,'xtick',xLine,'ytick',yLine)



ylabel('Risk aversion, $\gamma$','FontName','Times','Interpreter','latex','units','normalized');
xlabel('Technological uncertainty, $\lambda$','FontName', 'Times','Interpreter','latex','units','normalized');
zlabel('Optimal Investment Threshold,$ $ $\varepsilon_{0,\overline{1}}^{pf}$','FontName','Times','Interpreter','latex','units','normalized');


ax = gca;                                                   % current axes
align_axislabels(ax)                                        % Rotates the axis to align with graph
xlabh = get(gca,'XLabel');
set(xlabh, 'Units', 'Normalized', 'Position', [0.85, 0]);   % Changes the position of the x-label
ylabh = get(gca,'YLabel');
set(ylabh, 'Units', 'Normalized', 'Position', [0.10, 0.03]);   % Changes the position of the y-label
set(get(gca,'ZLabel'),'Rotation',90);


w11legend = legend(sprintf('$\\sigma=$ %0.2f', parameters.Sigma_medium),sprintf('$\\sigma=$ %0.2f', parameters.Sigma_low),'Location','northwest');
set(w11legend,'FontName','Times','Location',...
    'NorthEast','Interpreter','latex')
set(gcf, 'Renderer', 'opengl')
set(gca,'FontSize',Fs)

% saveas(h,[pwd, '/CompulsiveProp/PropCompulsive_Invest_follow'],'epsc')
% saveas(h,[pwd, '/CompulsiveProp/PropCompulsive_Invest_follow'],'png')
% saveas(h,'PropCompulsive_Invest','fig')
% saveas(h, [GraphPlace, '/PropCompulsive_Invest_follow.eps'],'epsc');
%print('../LatexFilePaper2/PropCompulsive_Invest_follow.eps','-depsc')
response = fig2plotly(h, 'filename', 'PropCompulsive_Invest_follow',  'strip', false, 'offline', true);


%close all
