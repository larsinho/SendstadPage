
Data =  loadjson('Compulsive_Relative_GAMMA_SIGMA_FMALevels.json');

%% Plotting for  leader
LineWidthCustom=0.1
hold on;
h=figure;


colormap(gray1);
fig1=surf(parameters.SIGMA3d_high,parameters.GAMMA3d_high, transpose(reshape(Data.RelativeLossF01_highFMA_leader,[parameters.n_high,parameters.n_high])),'LineWidth',LineWidthCustom,'EdgeColor',[0.7 0.7 0.7])
set(fig1,'facealpha',0.8)
freezeColors
hold on;
colormap(gray3);
fig1=surf(parameters.SIGMA3d_high,parameters.GAMMA3d_high, transpose(reshape(Data.RelativeLossF01_lowFMA_leader,[parameters.n_high,parameters.n_high])),'LineWidth',LineWidthCustom,'EdgeColor',[0.7 0.7 0.7])
set(fig1,'facealpha',0.8)
freezeColors

myXLim =  [linspace(min(parameters.SIGMA3d_high(:)),max(parameters.SIGMA3d_high(:)),2)]
%myXLim =  [0,0.5]
ylim([linspace(min(parameters.GAMMA3d(:)),max(parameters.GAMMA3d(:)),2)])
xlim(myXLim)
%zlim([linspace(0.5,1,2)])

yLine = [linspace(min(parameters.GAMMA3d(:)),max(parameters.GAMMA3d(:)),3)]
xLine = [linspace(myXLim(1),myXLim(2),3)]
%zLine = [linspace(0.5,1,3)]
set(gca,'xtick',xLine,'ytick',yLine)

ylabel('Risk aversion, $\gamma$','FontName','Times','Interpreter','latex','units','normalized');
xlabel('Volatiltiy, $\sigma$','FontName', 'Times','Interpreter','latex','units','normalized');
zlabel('Relative loss in value of leader','FontName','Times','Interpreter','latex','units','normalized');

ax = gca;                                                   % current axes
align_axislabels(ax)                                        % Rotates the axis to align with graph
xlabh = get(gca,'XLabel');
set(xlabh, 'Units', 'Normalized', 'Position', [0.85, 0]);   % Changes the position of the x-label
ylabh = get(gca,'YLabel');
set(ylabh, 'Units', 'Normalized', 'Position', [0.15, 0]);   % Changes the position of the y-label
set(get(gca,'ZLabel'),'Rotation',90);

w11legend = legend(sprintf('$D_{\\underline{1}} = %0.0f$, $D_{\\underline{2}} = %0.0f$', parameters.D1lBar,parameters.D2lBar),...
                                sprintf('$D_{\\underline{1}} = %0.0f$, $D_{\\underline{2}} = %0.0f$', parameters.D1lBar_low,parameters.D2lBar_low),'Location','northwest');
set(w11legend,'FontName','Times','Location',...
    'NorthEast','Interpreter','latex')
set(gcf, 'Renderer', 'opengl')
set(gca,'FontSize',Fs)

saveas(h,[pwd,'/CompulsiveProp/Relative_Proprietary_GAMMA_SIGMA_levelsFMA'],'epsc')
saveas(h,[pwd, '/CompulsiveProp/Relative_Proprietary_GAMMA_SIGMA_levelsFMA'],'png')
%saveas(h,'PropCompulsive_Invest','fig')
saveas(h, [GraphPlace,'/Relative_Proprietary_GAMMA_SIGMA_levelsFMA'],'eps')
    
close all
