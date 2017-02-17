


InvestSigmaLow =  loadjson('Compulsive_InvestSigmaLow_relativeLoss_v1.json');
InvestSigmaHigh =  loadjson('Compulsive_InvestSigmaMedium_relativeLoss_v1.json');

%% Plotting for Proprietary leaderLeader
hold on;
h=figure;

colormap(gray1);
fig1=surf(parameters.LAMBDA3d,parameters.GAMMA3d, transpose(reshape(InvestSigmaHigh.eps01_leader,[parameters.n,parameters.n])),'LineWidth',LineWidthCustom,'EdgeColor',EdgeColor.u)
set(fig1,'facealpha',0.8)
freezeColors
hold on;
colormap(gray3);
fig2=surf(parameters.LAMBDA3d,parameters.GAMMA3d, transpose(reshape(InvestSigmaLow.eps01_leader,[parameters.n,parameters.n])),'LineWidth',LineWidthCustom,'EdgeColor',EdgeColor.l)
set(fig2,'facealpha',0.8)
freezeColors

xlim([linspace(min(parameters.LAMBDA3d_high(:)),max(parameters.LAMBDA3d_high(:)),2)])
ylim([linspace(min(parameters.GAMMA3d(:)),max(parameters.GAMMA3d(:)),2)])

yLine = [linspace(min(parameters.GAMMA3d(:)),max(parameters.GAMMA3d(:)),3)]
xLine = [linspace(0,1,3)]
set(gca,'xtick',xLine,'ytick',yLine)



ylabel('Risk aversion, $\gamma$','FontName','Times','Interpreter','latex','units','normalized');
xlabel('Technological uncertainty, $\lambda$','FontName', 'Times','Interpreter','latex','units','normalized');
zlabel('Optimal Investment Threshold,$ $ $\varepsilon_{0,\underline{1}}^{p\ell}$','FontName','Times','Interpreter','latex','units','normalized');


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


% saveas(h,[pwd, '/CompulsiveProp/PropCompulsive_Invest_leader'],'epsc')
% saveas(h,[pwd, '/CompulsiveProp/PropCompulsive_Invest_leader'],'png')
% %saveas(h,'PropCompulsive_Invest','fig')
% saveas(h, [GraphPlace, '/PropCompulsive_Invest_leader.eps'],'epsc');


print('../LatexFilePaper2/PropCompulsive_Invest_leader.eps','-depsc')

close all
