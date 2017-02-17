

d =  loadjson('Compulsive_Relative_GAMMA_LAMBDA_SigmaLevels.json');

%% Relative loss for NonPropLeader
LineWidthCustom=0.1
hold on;
h=figure;

colormap(gray1);
fig2=surf(parameters.LAMBDA3d_high,parameters.GAMMA3d, transpose(reshape(d.RelativeLossF01_SigmaHigh,[parameters.n,parameters.n])),'LineWidth',LineWidthCustom,'EdgeColor',EdgeColor.u)
set(fig2,'facealpha',0.8)
freezeColors
hold on;
colormap(gray3);
fig2=surf(parameters.LAMBDA3d_high,parameters.GAMMA3d, transpose(reshape(d.RelativeLossF01_SigmaLow,[parameters.n,parameters.n])),'LineWidth',LineWidthCustom,'EdgeColor',EdgeColor.l)
set(fig2,'facealpha',0.8)
freezeColors

myXLim =  [linspace(min(parameters.LAMBDA3d_high(:)),max(parameters.LAMBDA3d_high(:)),2)]
ylim([linspace(min(parameters.GAMMA3d(:)),max(parameters.GAMMA3d(:)),2)])
xlim(myXLim)
%zlim([linspace(0.5,1,2)])

yLine = [linspace(min(parameters.GAMMA3d(:)),max(parameters.GAMMA3d(:)),3)]
xLine = [linspace(myXLim(1),myXLim(2),3)]
%zLine = [linspace(0.5,1,3)]
set(gca,'xtick',xLine,'ytick',yLine)


ylabel('Risk aversion, $\gamma$','FontName','Times','Interpreter','latex','units','normalized');
xlabel('Technological Uncertainty, $\lambda$','FontName', 'Times','Interpreter','latex','units','normalized');
zlabel('Relative loss in value of leader','FontName','Times','Interpreter','latex','units','normalized');


ax = gca;                                                   % current axes
align_axislabels(ax)                                        % Rotates the axis to align with graph
xlabh = get(gca,'XLabel');
set(xlabh, 'Units', 'Normalized', 'Position', [0.85, 0]);   % Changes the position of the x-label
ylabh = get(gca,'YLabel');
set(ylabh, 'Units', 'Normalized', 'Position', [0.10, 0.03]);   % Changes the position of the y-label
set(get(gca,'ZLabel'),'Rotation',90);

w11legend = legend(sprintf('$\\sigma=$ %0.2f', parameters.Sigma_medium),...
                                sprintf('$\\sigma=$ %0.2f', parameters.Sigma_low) ,'Location','northwest');
set(w11legend,'FontName','Times','Location',...
    'NorthEast','Interpreter','latex')
set(gcf, 'Renderer', 'opengl')
set(gca,'FontSize',Fs)

% saveas(h,[pwd, '/CompulsiveProp/PropCompulsive_3d_relative_GAMMA_LAMBDA_levelSigma_leader'],'epsc')
% saveas(h,[pwd, '/CompulsiveProp/PropCompulsive_3d_relative_GAMMA_LAMBDA_levelSigma_leader'],'png')
% %saveas(h,'PropCompulsive_Invest','fig')
% saveas(h, [GraphPlace, '/CompulsiveProp_3d_relative_GAMMA_LAMBDA_levelSigma_leader.eps'],'epsc');

print('../LatexFilePaper2/CompulsiveProp_3d_relative_GAMMA_LAMBDA_levelSigma_leader.eps','-depsc')


close all
