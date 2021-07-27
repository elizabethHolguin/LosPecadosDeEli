from django.shortcuts import render
from django.views.generic import TemplateView
from django.template import loader
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework import permissions
from django.core.mail import send_mail

@api_view(['POST'])
def formulario(request):
    if request.method == 'POST':
        datos = request.data
        send_mail(
                "Opinión de " + datos.get('email'),
                "Email: " + datos.get('email') +"\n"
                + "Fecha de Nacimiento: " + datos.get('fecha') + "\n"
                + "Ciudad donde reside: " + datos.get('ciudad') + "\n\n"
                + datos.get('content'),
                datos.get('email'),
                ['dreamtim2020@gmail.com'],)
        if datos:
            data = {'email':datos.get('email')}
            return Response(data, status=status.HTTP_202_ACCEPTED)
        return Response("error", status=status.HTTP_400_BAD_REQUEST)  
