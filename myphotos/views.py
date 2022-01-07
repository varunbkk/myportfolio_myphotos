from django.shortcuts import render,redirect
from .models import Category,Photo
from django.http import JsonResponse
from django.template.loader import render_to_string
from django.contrib.auth.decorators import login_required
from django.db.models import Q
# Create your views here.

def gallery(request):
    categories = Category.objects.all()
    photos = Photo.objects.all().order_by('id')
    context = {'categories':categories,'photos':photos}
    return render(request,'myphotos/gallery.html',context)

@login_required
def add_photo(request):
    categories = Category.objects.all()

    if request.method == 'POST':
        data = request.POST
        image = request.FILES.get('image')

        # Checks what category the user selected in the drop-down
        if data['category'] != 'none':

            category = Category.objects.get(id=data['category'])
        # Creates a new category, if the user provided a input in the category_new field
        elif data['category_new'] != '':
            category, created = Category.objects.get_or_create(name=data['category_new'])
        else:
            category = None

        photo = Photo.objects.create(category=category,description=data['description'],image=image)

        return redirect('gallery')

    context = {'categories':categories}
    return render(request,'myphotos/addphoto.html',context)

from django.views.decorators.csrf import csrf_exempt
@csrf_exempt
def search_photos(request):
    data = {}
    is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'
    if is_ajax:
        if request.method == 'GET':
            search_value=request.GET.get('searchValue')
            categories=request.GET.getlist('filterArray[]')
            if len(categories) > 0:
                result = Photo.objects.filter(Q(description__icontains=search_value) | Q(tags__name__icontains=search_value)).filter(category__name__in=categories).order_by('id').distinct()
                data['filter_search_result'] = render_to_string(template_name='myphotos/search_photos.html',context={'photos':result})
            return JsonResponse(data)

@csrf_exempt
def filter_photos(request):
    data = {}
    result = {}
    is_ajax = request.headers.get('X-Requested-With') == 'XMLHttpRequest'
    if is_ajax:
        if request.method == 'GET':
            categories=request.GET.getlist('filterArray[]')
            if len(categories) > 0:
                result = Photo.objects.filter(category__name__in=categories)
            data['filter_result'] = render_to_string(template_name='myphotos/search_photos.html',context={'photos':result})
            return JsonResponse(data)
