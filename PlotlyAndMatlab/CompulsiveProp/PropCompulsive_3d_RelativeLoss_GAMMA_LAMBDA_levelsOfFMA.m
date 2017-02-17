
Data =  loadjson('Compulsive_InvestSigmaMedium_relativeLoss_v1.json');


%% Plotting for Proprietary leader

LineWidthCustom=0.1
hold on;
h=figure;

colormap(gray1);
fig2=surf(parameters.LAMBDA3d_high,parameters.GAMMA3d, transpose(reshape(Data.RelativeLossF01_highFMA_leader,[parameters.n,parameters.n])),'LineWidth',LineWidthCustom,'EdgeColor',EdgeColor.u)
set(fig2,'facealpha',0.8)
freezeColors
hold on;
colormap(gray3);
fig2=surf(parameters.LAMBDA3d_high,parameters.GAMMA3d, transpose(reshape(Data.RelativeLossF01_lowFMA_leader,[parameters.n,parameters.n])),'LineWidth',LineWidthCustom,'EdgeColor',EdgeColor.l)
set(fig2,'facealpha',0.8)
freezeColors




myXLim =  [linspace(min(parameters.LAMBDA3d_high(:)),max(parameters.LAMBDA3d_high(:)),2)]
%myXLim =  [0,0.5]
ylim([linspace(min(parameters.GAMMA3d(:)),max(parameters.GAMMA3d(:)),2)])
xlim(myXLim)
zlim([0.15 0.45])


yLine = [linspace(min(parameters.GAMMA3d(:)),max(parameters.GAMMA3d(:)),3)]
xLine = [linspace(myXLim(1),myXLim(2),3)]
%zLine = [linspace(0.5,1,3)]
set(gca,'xtick',xLine,'ytick',yLine)

ylabel('Risk aversion, $\gamma$','FontName','Times','Interpreter','latex','units','normalized');
xlabel('Technological uncertainty, $\lambda$','FontName', 'Times','Interpreter','latex','units','normalized');
zlabel('Relative loss in value of leader','FontName','Times','Interpreter','latex','units','normalized');


ax = gca;                                                   % current axes
align_axislabels(ax)                                        % Rotates the axis to align with graph
xlabh = get(gca,'XLabel');
set(xlabh, 'Units', 'Normalized', 'Position', [0.85, 0]);   % Changes the position of the x-label
ylabh = get(gca,'YLabel');
set(ylabh, 'Units', 'Normalized', 'Position', [0.10, 0.03]);   % Changes the position of the y-label
set(get(gca,'ZLabel'),'Rotation',90);

w11legend = legend(sprintf('$D_{\\underline{1}} = %0.0f$, $D_{\\underline{2}} = %0.0f$', parameters.D1lBar,parameters.D2lBar),...
                                sprintf('$D_{\\underline{1}} = %0.0f$, $D_{\\underline{2}} = %0.0f$', parameters.D1lBar_low,parameters.D2lBar_low),'Location','northwest');
set(w11legend,'FontName','Times','Location',...
    'NorthEast','Interpreter','latex')
set(gcf, 'Renderer', 'opengl')
set(gca,'FontSize',Fs)


%saveas(h,[pwd, '/CompulsiveProp/Relative_Proprietary_GAMMA_LAMBDA_FMALevels'],'png')
%saveas(h,'PropCompulsive_Invest','fig')
%saveas(h, [GraphPlace,'/Relative_Proprietary_GAMMA_LAMBDA_FMALevels'],'eps')

print('../LatexFilePaper2/Relative_Proprietary_GAMMA_LAMBDA_FMALevels.eps','-depsc')


close all
